/** @format */

const router = require('express').Router();
const { User, Dog } = require('../db');

//get all users
router.get('/', async (req, res, next) => {
	try {
		let users = await User.findAll({
			include: [
				{
					model: Dog,
				},
			],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

//get one user
router.get('/:id', async (req, res, next) => {
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

//update user
router.put('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		const updatedUser = await user.update(req.body);
		res.json(updatedUser);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
