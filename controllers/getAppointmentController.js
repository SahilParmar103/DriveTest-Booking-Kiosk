const UserDetails = require("../models/User");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const selectedDate = req.body.date;
  const data = await UserDetails.findOne({ _id: req.session.userId });
  const appointments = await Appointment.find({
    date: selectedDate,
    isTimeSlotAvailable: true,
  });

  if (req.session.userId) {
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
        if (req.params.page == "g2_page") {
          res.render("g2", {
            userData,
            success: "",
            failure: "", //login is the name of the view g2.ejs
            date: selectedDate,
            timeslots: appointments,
            bookSuccessMessage: "",
          });
        } else {
          res.render("g", {
            userDetails: userData,
            success: "",
            failure: "", //login is the name of the view g2.ejs
            date: selectedDate,
            timeslots: appointments,
            bookSuccessMessage: "",
          });
        }
      } else {
        if (req.params.page == "g2_page") {
          res.render("g2", {
            userData: data,
            success: "",
            failure: "", //login is the name of the view g2.ejs
            date: selectedDate,
            timeslots: appointments,
            bookSuccessMessage: "",
          });
        } else {
          res.render("g", {
            userDetails: data,
            success: "",
            failure: "", //login is the name of the view g2.ejs
            date: selectedDate,
            timeslots: appointments,
            bookSuccessMessage: "",
          });
        }
      }
    });
  }
};
