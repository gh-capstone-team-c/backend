/** @format */

const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 3000;
const db = require('./db/db');
const User = require('./db/user');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

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

io.on('connect', (socket) => {
	console.log("hey we're connected!");

	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
	});

	socket.on("addPoints", (pointsObj) => {
		const user =  User.findByPk(req.user.id);
		const updateUser = user.update(pointsObj);
		io.emit("pointsUpdated", updateUser)
	})

});

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
