/** @format */

const db = require('./db');
const User = require('./user');
const Dog = require('./dog');

//associations
Dog.belongsTo(User);
User.hasOne(Dog);
//might need to add more here if we're doing friend requests/accepts stuff
// User.belongsToMany(User, { as: 'friend', through: 'friendly' });
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
