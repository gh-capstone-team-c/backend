/** @format */

const Sequelize = require('sequelize');
const db = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost:5432/gobarkbackend',
	{
		logging: false,
	}
);

module.exports = db;
