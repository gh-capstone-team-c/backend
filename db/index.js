/** @format */

const db = require('./db');
const User = require('./user');
const Dog = require('./dog');
const Photo = require('./photo');

//associations
Dog.belongsTo(User);
User.hasOne(Dog);

Photo.belongsTo(User);
User.hasMany(Photo);

//users have followers and they can follow others
User.belongsToMany(User, {
	as: 'follower',
	through: 'followers',
	foreignKey: 'followedId',
});
User.belongsToMany(User, {
	as: 'following',
	through: 'followers',
	foreignKey: 'followerId',
});

module.exports = {
	db,
	User,
	Dog,
	Photo,
};
