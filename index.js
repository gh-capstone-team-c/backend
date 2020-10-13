/** @format */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db/db');
const User = require('./db/user');

app.get('/', (req, res) => {
	res.send('hi!');
});

app.use('/api', require('./api'));

async () => {
	await db.sync({ force: true });
};

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
