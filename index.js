/** @format */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db/db');
const User = require("./db/user")

app.get('/', (req, res) => {
	res.send('hi!');
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next (err)
  }
})

async () => {
	await db.sync({ force: true });
};

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
