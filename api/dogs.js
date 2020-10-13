/** @format */

const router = require('express').Router();
const { User, Dog } = require('../db');

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

//get one dog
router.get('/:id', async (req, res, next) => {
	try {
		let dog = await Dog.findByPk(req.params.id, {
			include: [{ model: User }],
		});
		res.json(dog);
	} catch (err) {
		next(err);
	}
});

//update one dog
router.put('/:id', async (req, res, next) => {
	try {
		const dog = await Dog.findByPk(req.params.id);
		const updatedDog = await dog.update(req.body);
		res.json(updatedDog);
	} catch (err) {
		next(err);
	}
});

//create a dog
router.post('/', async (req, res, next) => {
	try {
		const newDog = await Dog.create(req.body);
		res.json(newDog);
	} catch (err) {
		next(err);
	}
});

//delete a dog
router.delete('/:id', async (req, res, next) => {
	try {
		await Dog.destroy({
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