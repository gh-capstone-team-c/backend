/** @format */

const express = require('express');
const router = express.Router();

//mount routes
router.use('/users', require('./users'));
router.use('/dogs', require('./dogs'));
router.use('/photos', require('./photos'));

router.use((req, res, next) => {
	const err = new Error('API route not found!');
	err.status = 404;
	next(err);
});

module.exports = router;
