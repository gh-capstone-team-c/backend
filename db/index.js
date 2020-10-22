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

//set it up like twitter where you can have followers and you can follow people
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
