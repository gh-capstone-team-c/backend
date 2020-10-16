/** @format */
const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('./db');

//still need to add photos for a gallery
const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	password: {
		type: Sequelize.STRING,
		// Making `.password` act like a func hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('password');
		},
	},
	salt: {
		type: Sequelize.STRING,
		// Making `.salt` act like a function hides it when serializing to JSON.
		// This is a hack to get around Sequelize's lack of a "private" option.
		get() {
			return () => this.getDataValue('salt');
		},
	},
	points: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue:
			'https://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png',
	},
	photos: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
	},
	//determines whether user has admin privileges
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
	return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
	users.forEach(setSaltAndPassword);
});
