/** @format */

const { db, User, Dog } = require('./db');

const seed = async () => {
	try {
		await db.sync({ force: true });

		// seed your database here!

		const betsy = await User.create({
			email: 'betsy@email.com',
			password: '123',
		});

		const leslie = await User.create({
			email: 'leslie@email.com',
			password: '456',
		});

		const marie = await User.create({
			email: 'marie@email.com',
			password: '789',
		});

		const kody = await Dog.create({
			name: 'Kody-boo',
		});

		const arya = await Dog.create({
			name: 'Arya',
		});

		const hobbes = await Dog.create({
			name: 'Hobbes',
		});

		await betsy.setDog(kody);
		await marie.setDog(hobbes);
		await leslie.setDog(arya);

		// await betsy.setPet(kody);
		// await marie.setPet(hobbes);
		// await leslie.setPet(arya);

		// await kody.setUser(betsy);
		// await hobbes.setUser(marie);
		// await arya.setUser(leslie);

		await leslie.addFollower(marie);
		await marie.addFollower(betsy);
		// console.log(Object.keys(betsy.__proto__));
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
