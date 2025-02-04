const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (
      (user && !error) ||
      req.session.userType == "Driver" ||
      req.session.userType == "Admin"
    ) {
      next();
    } else {
      return res.redirect("/login");
    }
  });
};
