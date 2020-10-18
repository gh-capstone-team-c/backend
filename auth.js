/** @format */

const router = require('express').Router();
const { User, Dog } = require('./db');

//get user's info
router.get('/me', async (req, res, next) => {
	try {
		if (!req.session.userId) {
			res.sendStatus(401);
		} else {
			const user = await User.findById(req.session.userId, {
				include: [
					{ model: Dog },
					{
						model: User,
						as: 'follower',
						// through: 'followers',
						where: {
							followedId: req.session.userId,
						},
					},
					{
						model: User,
						as: 'following',
						// through: 'followers',
						where: {
							followerId: req.session.userId,
						},
					},
				],
			});
			if (!user) {
				res.sendStatus(401);
			} else {
				res.json(user);
			}
		}
	} catch (error) {
		next(error);
	}
});

//login
// router.put('/login', async (req, res, next) => {
// 	try {
// 		const user = await User.findOne({
// 			where: {
// 				email: req.body.email,
// 				password: req.body.password,
// 			},
// 		});
// 		if (!user) {
// 			res.sendStatus(401);
// 		} else {
// 			// attach user id to the session
// 			req.session.userId = user.id;
// 			res.json(user);
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { email: req.body.email },
			include: [
				{ model: Dog },
				{
					model: User,
					as: 'follower',
					// through: 'followers',
					where: {
						followedId: req.session.userId,
					},
				},
				{
					model: User,
					as: 'following',
					// through: 'followers',
					where: {
						followerId: req.session.userId,
					},
				},
			],
		});
		if (!user) {
			console.log('No such user found:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for user:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else {
			req.login(user, (err) => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});

//signup
router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		req.login(user, (err) => (err ? next(err) : res.json(user)));
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

//associate a dog to a newly signed up user
router.post('/me', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);
		console.log('req', req);
		const dog = await Dog.create(req.body);
		await user.update(user.setDog(dog));
		res.json(user);
	} catch (err) {
		next(err);
	}
});

//update a single user's info
router.put('/me', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);
		const updateUser = await user.update(req.body);
		res.json(updateUser);
	} catch (err) {
		next(err);
	}
});

//logout
router.delete('/logout', (req, res) => {
	// remove user id from session
	delete req.session.userId;
	res.sendStatus(204);
});

module.exports = router;
