const UserDetails = require("../models/User");
const bcrypt = require("bcrypt");

//fetching the data in database based on license number
module.exports = async (req, res) => {
  if (req.session.userId) {
    const data = await UserDetails.findOne({ _id: req.session.userId });

    //checking if license number is same...if same the ge page will have empty fields
    bcrypt.compare("AB11CDE", data.license, (error, same) => {
      if (same) {
        // if password match
        const userData = {
          _id: req.session.userId,
          fname: "",
          lname: "",
          age: "",
          dob: "",
          license: "",
          carDetails: {
            make: "",
            model: "",
            color: "",
            year: "",
            plateNumber: "",
          },
        };
        return res.render("g2", {
          userData,
          success: "",
          failure: "", //login is the name of the view g2.ejs
          date: null,
          timeslots: [],
          bookSuccessMessage: "",
        });
      } else {
        return res.render("g", {
          userDetails: data,
          success: "",
          failure: "", //login is the name of the view g2.ejs
          date: null,
          timeslots: [],
          bookSuccessMessage: "",
        });
      }
    });
  } else {
    return res.redirect("login");
  }
};
