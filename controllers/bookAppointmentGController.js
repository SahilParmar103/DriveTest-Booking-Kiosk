const UserDetails = require("../models/User");
const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  // Fetch user data from UserDetails model based on session userId
  let dataofUser = await UserDetails.findOne({ _id: req.session.userId });
  // Fetch appointment data from Appointment model based on provided id
  const appointment = await Appointment.findById(req.params.id);
  // If appointment not found or time slot is unavailable, render a notFound view
  if (!appointment || !appointment.isTimeSlotAvailable) {
    res.render("notFound", {
      message: "404 - Appointment not found or unavailable",
      linkUrl: "appointments",
      linkText: "Go Back",
    });
  } else {
    // Update appointment data with userId and mark time slot as unavailable
    appointment.isTimeSlotAvailable = false;
    appointment.userid = req.session.userId;
    // If user data not found, render a notFound view
    if (!dataofUser) {
      res.render("notFound", {
        message: "404 - User not found",
        linkUrl: "appointments",
        linkText: "Go Back",
      });
    } else {
      // Update user data with appointment details
      dataofUser.appointment.push({ id: req.params.id, testType: "G" });
      await UserDetails.updateOne(
        {
          _id: req.session.userId,
        },
        {
          $set: dataofUser,
        }
      );
      await appointment.save();
      // Render g view with appropriate data
      res.render("g", {
        dataofUser,
        success: "",
        failure: "", //login is the name of the view g2.ejs
        date: null,
        timeslots: [],
        bookSuccessMessage: "Appointment booked successfully",
      });
    }
  }
};
