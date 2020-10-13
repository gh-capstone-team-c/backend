/** @format */

const db = require('./db');
const User = require('./user');
const Dog = require('./dog');

//associations
Dog.belongsTo(User);
User.hasOne(Dog);
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
};
