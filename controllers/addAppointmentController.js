const Appointment = require("../models/Appointment");

// Function to modify time format from 24-hour to 12-hour with AM/PM
const modifyTimings = (time) => {
  var timeSplit = time.split(":"),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }
  return hours + ":" + minutes + ":" + meridian;
};

// Exported function to handle appointment creation
module.exports = async (req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  const timetoCheck = modifyTimings(time); // Modify time format to check against existing appointments
  // Check if appointment slot already exists
  Appointment.findOne({ date: date, time: timetoCheck }, (err, appointment) => {
    if (appointment) {
      res.render("notFound", {
        message: "400 - Appointment slot already exists",
        linkUrl: "appointments",
        linkText: "Go Back",
      });
    } else if (err) {
      // If error occurred while querying the database
      console.error(err);
      res.render("notFound", {
        message: "500 - Internal server error",
        linkUrl: "appointments",
        linkText: "Go Back",
      });
    } else {
      // If appointment slot doesn't exist and no error occurred
      let timeToSave = modifyTimings(time);
      // Save new appointment to the database
      const newAppointment = new Appointment({
        date: date,
        time: timeToSave,
        isTimeSlotAvailable: true,
        userid: req.session.userId,
        testType: "",
      });

      newAppointment.save((err) => {
        if (err) {
          console.error(err);
          res.render("notFound", {
            message: "500 - Internal server error",
            linkUrl: "appointments",
            linkText: "Go Back",
          });
        } else {
          res.redirect("/appointments");
        }
      });
    }
  });
};
