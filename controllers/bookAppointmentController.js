const UserDetails = require("../models/User");
const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  // Fetch user data from UserDetails model based on session userId
  let dataofUser = await UserDetails.findOne({ _id: req.session.userId });
  // Fetch appointment data from Appointment model based on provided id
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment || !appointment.isTimeSlotAvailable) {
    // If appointment not found or time slot is unavailable, render a notFound view
    res.render("notFound", {
      message: "404 - Appointment not found or unavailable",
      linkUrl: "appointments",
      linkText: "Go Back",
    });
  } else {
    // Update appointment data with userId, testType, and mark time slot as unavailable
    appointment.isTimeSlotAvailable = false;
    appointment.userid = req.session.userId;
    appointment.testType = req.params.page;
    // If user data not found, render a notFound view
    if (!dataofUser) {
      res.render("notFound", {
        message: "404 - User not found",
        linkUrl: "appointments",
        linkText: "Go Back",
      });
    } else {
      // Update user data with appointment details
      const pageName = req.params.page;
      dataofUser.appointment.push({ id: req.params.id, testType: pageName });
      await UserDetails.updateOne(
        {
          _id: req.session.userId,
        },
        {
          $set: dataofUser,
        }
      );
      await appointment.save();
      // Render appropriate view based on the testType
      if (pageName == "G2") {
        res.render("g2", {
          dataofUser,
          success: "",
          failure: "", //login is the name of the view g2.ejs
          date: null,
          timeslots: [],
          bookSuccessMessage: "Appointment booked successfully",
        });
      } else {
        res.render("g", {
          userDetails: dataofUser,
          success: "",
          failure: "", //login is the name of the view g2.ejs
          date: null,
          timeslots: [],
          bookSuccessMessage: "Appointment booked successfully",
        });
      }
    }
  }
};
