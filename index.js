/** @format */

const express = require('express');
const app = express();
const morgan = require('morgan')
const session = require('express-session')
const port = process.env.PORT || 3000;
const db = require('./db/db');
const User = require('./db/user');

// Logging middleware
app.use(morgan('dev'))

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Session middleware
app.use(session({
  secret: 'This is not a very secure secret...',
  resave: false,
  saveUninitialized: false
}))

app.get('/', (req, res) => {
	res.send('hi!');
});

// authentication router
app.use('/auth', require('./auth'))
//other routes
app.use('/api', require('./api'));

async () => {
	await db.sync({ force: true });
};

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
