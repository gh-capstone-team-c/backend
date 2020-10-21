/** @format */

//isUser middleware created to protect api routes
const isUser = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		const error = new Error("Sorry, you can't go there!");
		res.sendStatus(401);
		next(error);
	}
};

module.exports = isUser;
