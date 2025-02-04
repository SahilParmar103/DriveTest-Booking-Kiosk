module.exports = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/"); // If user is logged in, redirect to home page
  } else {
    next();
  }
};
