/** @format */

const router = require('express').Router();
const { User, Dog, Photo } = require('./db');
const Sequelize = require('sequelize');

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
						model: Photo,
						where: {
							userId: req.user.id,
						},
					},
					{
						model: User,
						as: 'follower',
					},
					{
						model: User,
						as: 'following',
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

router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { email: req.body.email },
			include: [
				{ model: Dog },
				{
					model: Photo,
					where: {
						userId: req.user.id,
					},
				},
				{
					model: User,
					as: 'follower',
				},
				{
					model: User,
					as: 'following',
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

		const dog = await Dog.create(req.body);
		await user.update(user.setDog(dog));
		res.json(user);
	} catch (err) {
		next(err);
	}
});

//associate a photo to a user
router.post('/me/photo', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);
		const pic = await Photo.create(req.body);
		await user.update(user.addPhoto(pic));
		res.json(user);
	} catch (err) {
		next(err);
	}
});

//get photos associated to a user
router.get('/me/allphotos', async (req, res, next) => {
	try {
		const photos = await Photo.findAll({
			where: {
				userId: req.user.id,
			},
		});
		res.json(photos);
	} catch (err) {
		next(err);
	}
});

//follow someone
router.put('/me/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);

		const following = await User.findByPk(req.params.id);
		await user.update(user.addFollowing(following));
		res.json(user);
	} catch (err) {
		next(err);
	}
});

//unfollow someone
router.post('/me/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);

		const following = await User.findByPk(req.params.id);
		await user.update(user.removeFollowing(following));
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
