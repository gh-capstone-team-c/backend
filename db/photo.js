/** @format */

const Sequelize = require('sequelize');
const db = require('./db');

const Photo = db.define('photo', {
	path: {
		type: Sequelize.TEXT,
	},
});

module.exports = Photo;
