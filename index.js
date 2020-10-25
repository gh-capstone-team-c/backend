/** @format */

const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 3000;
const db = require('./db/db');
const User = require('./db/user');
//socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
	session({
		secret: 'This is not a very secure secret...',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send('hi!');
});

// authentication router
app.use('/auth', require('./auth'));
//other routes
app.use('/api', require('./api'));

async () => {
	await db.sync({ force: true });
};

io.on('connection', (socket) => {
	console.log('connected!');

	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
	});

	socket.on('updatePoints', () => {
		console.log('backend: update points');
		io.emit('pointsUpdated');
	});

	socket.on('disconnect', () => {
		console.log('disconnected');
	});
});

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
