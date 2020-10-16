//isAdmin middleware created to protect api routes
const isAdmin = (req, res, next) => {
  const currUser = req.user
  if (currUser && currUser.isAdmin) {
    next()
  } else {
    const error = new Error("Sorry, you can't go there!")
    res.sendStatus(401)
    next(error)
  }
}

module.exports = isAdmin
