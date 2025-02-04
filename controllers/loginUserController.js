const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body; // Get data from form req body

    // Find user in the database by username
    const user = await User.findOne({ username });

    if (user) {
      // Compare passwords using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Password matches, set session and redirect
        req.session.userId = user._id;
        req.session.userType = user.userType;
        res.redirect("/");
      } else {
        res.render("login", {
          success: "",
          failure: "Login Failed. Invalid username or password",
        });
      }
    } else {
      res.render("login", {
        success: "",
        failure: "No User Found",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("An error occurred during login.");
  }
};
