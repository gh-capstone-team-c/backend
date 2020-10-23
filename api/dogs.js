/** @format */

const router = require('express').Router();
const { User, Dog } = require('../db');
const isUser = require('./isUserMiddleware');

//get all dogs
router.get('/', async (req, res, next) => {
	try {
		let dogs = await Dog.findAll({
			include: [{ model: User }],
		});
		res.json(dogs);
	} catch (err) {
		next(err);
	}
});

//update one dog
router.put('/:id', isUser, async (req, res, next) => {
	try {
		const dog = await Dog.findByPk(req.params.id);
		const updatedDog = await dog.update(req.body);
		res.json(updatedDog);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
