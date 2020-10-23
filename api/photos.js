/** @format */

const router = require('express').Router();
const { Photo } = require('../db');

//get all photos
router.get('/', async (req, res, next) => {
	try {
		let photos = await Photo.findAll();
		res.json(photos);
	} catch (err) {
		next(err);
	}
});

//delete a photo
router.delete('/:id', async (req, res, next) => {
	try {
		await Photo.destroy({
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
