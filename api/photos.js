/** @format */

const router = require('express').Router();
const { User, Dog, Photo } = require('../db');
const isAdmin = require('./isAdminMiddleware');
const isUser = require('./isUserMiddleware');
const Sequelize = require('sequelize');

//get all photos
router.get('/', async (req, res, next) => {
	try {
		let photos = await Photo.findAll();
		res.json(photos);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
