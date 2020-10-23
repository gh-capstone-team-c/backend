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
			attributes: ['id', 'email', 'points', 'imageUrl'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
