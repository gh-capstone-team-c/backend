/** @format */

const db = require('./db/db');
const User = require("./db/user")

const seed = async () => {
	try {
		await db.sync({ force: true });

		// seed your database here!

		const betsy = await User.create({
			email: 'grotoned@gmail.com',
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log('Seeding success!');
		})
		.catch((err) => {
			console.error('Oh noes! Something went wrong!');
			console.error(err);
		});
}
