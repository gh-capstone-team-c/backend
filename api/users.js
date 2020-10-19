/** @format */

const router = require('express').Router();
const { User, Dog } = require('../db');
const isAdmin = require('./isAdminMiddleware');
const isUser = require('./isUserMiddleware');

//get all users
router.get('/', isUser, async (req, res, next) => {
	try {
		let users = await User.findAll({
			include: [
				{
					model: Dog,
				},
			],
			attributes: ['id', 'email', 'points', 'imageUrl'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

//get one user
router.get('/:id', isAdmin, async (req, res, next) => {
	try {
		let user = await User.findByPk(req.params.id, {
			include: [
				{
					model: Dog,
				},
			],
		});
		res.json(user);
	} catch (err) {
		next(err);
	}
});

//update user--this would be for an admin to update a user's settings--we might not need this since i also wrote a route for the user to update their own settings
router.put('/:id', isAdmin, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		const updatedUser = await user.update(req.body);
		res.json(updatedUser);
	} catch (err) {
		next(err);
	}
});

//create a new user
router.post('/', isAdmin, async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);
		res.json(newUser);
	} catch (err) {
		next(err);
	}
});

//delete a user
router.delete('/:id', isAdmin, async (req, res, next) => {
	try {
		await User.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
