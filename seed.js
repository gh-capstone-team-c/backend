/** @format */

const { db, User, Dog, Photo } = require('./db');

const seed = async () => {
	try {
		await db.sync({ force: true });

		// seed your database here!

		const admin = await User.create({
			email: 'admin',
			password: 'admin',
			isAdmin: true,
		});

		const betsy = await User.create({
			email: 'betsy@email.com',
			password: '123',
			points: 5
		});

		const leslie = await User.create({
			email: 'leslie@email.com',
			password: '456',
			points: 10
		});

		const marie = await User.create({
			email: 'marie@email.com',
			password: '789',
			points: 15
		});

		const john = await User.create({
			email: 'john@email.com',
			password: '222',
			points: 4
		});

		const allan = await User.create({
			email: 'allan@email.com',
			password: '111',
			points: 8
		});

		const alex = await User.create({
			email: 'alex@email.com',
			password: '333',
			points: 2
		});

		const orlando = await User.create({
			email: 'orlando@email.com',
			password: '555',
			points: 20
		});

		const matt = await User.create({
			email: 'matt@email.com',
			password: '123',
			points: 28
		});

		const elle = await User.create({
			email: 'elle@email.com',
			password: '222',
			points: 9
		});

		const kody = await Dog.create({
			name: 'Kody-boo',
			color: 'blackTan',
		});

		const arya = await Dog.create({
			name: 'Arya',
			color: 'cream',
		});

		const hobbes = await Dog.create({
			name: 'Hobbes',
			color: 'blackTan',
		});

		const jodi = await Dog.create({
			name: 'Jodi',
			color: 'blackTan',
		});

		const sparky = await Dog.create({
			name: 'Sparky',
			color: 'red',
		});

		const rover = await Dog.create({
			name: 'Rover',
			color: 'blackTan',
		});

		const cupcake = await Dog.create({
			name: 'Cupcake',
			color: 'cream',
		});

		const buttercup = await Dog.create({
			name: 'Buttercup',
			color: 'cream',
		});



		//dog associated to user
		await betsy.setDog(kody);
		await marie.setDog(hobbes);
		await leslie.setDog(arya);
		await john.setDog(jodi);
		await allan.setDog(sparky);
		await alex.setDog(rover);
		await orlando.setDog(cupcake);
		await elle.setDog(buttercup);

		//practice associating a photo to a user
		// await betsy.addPhoto(pic1);

		//added followers

		await leslie.addFollowing(marie);
		await marie.addFollowing(leslie);
		await leslie.addFollowing(alex);
		await marie.addFollowing(alex);
		await leslie.addFollowing(orlando);
		await leslie.addFollowing(betsy);
		await marie.addFollowing(betsy);
		await marie.addFollowing(orlando);
		await betsy.addFollowing(marie);
		await betsy.addFollowing(leslie);

		console.log(Object.keys(betsy.__proto__));
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
