const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (user && req.session.userType === "Examiner") {
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .send("An error occurred while checking user authorization.");
  }
};
