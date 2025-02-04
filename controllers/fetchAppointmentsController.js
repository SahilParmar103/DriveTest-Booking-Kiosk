const User = require("../models/User");
const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  // Check if userType is 'all'
  if (req.body.userType == "all") {
    try {
      // Fetch appointments with testType 'G2' or 'G'
      const appointments = await Appointment.find({
        testType: { $in: ["G2", "G"] },
      })
        .populate("userid")
        .exec();
      // Format appointments data
      const formattedAppointments = appointments.map((appointment) => {
        return {
          _id: appointment._id,
          date: appointment.date,
          time: appointment.time,
          isTimeSlotAvailable: appointment.isTimeSlotAvailable,
          carDetails: {
            make: appointment.userid.carDetails.make,
            model: appointment.userid.carDetails.model,
            year: appointment.userid.carDetails.year,
            color: appointment.userid.carDetails.color,
            numberPlate: appointment.userid.carDetails.numberPlate,
          },
          user_id: appointment.userid._id,
          appointments: appointment.userid.appointment,
          fname: appointment.userid.fname,
          lname: appointment.userid.lname,
          license: appointment.userid.license,
          username: appointment.userid.username,
          password: appointment.userid.password,
          userType: appointment.userid.userType,
          age: appointment.userid.age,
          dob: appointment.userid.dob,
          __v: appointment.userid.__v,
          userid: appointment.userid._id,
          testType: appointment.testType,
          __v: appointment.__v,
          comment: appointment.comment,
          passFail: appointment.passFail,
        };
      });
      // Render the 'examiner' view with formatted appointments data
      res.render("examiner", {
        appointments: formattedAppointments,
        userType: req.body.userType,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    // Fetch appointments with testType = 'test type selected'
    try {
      const appointments = await Appointment.find({
        testType: req.body.userType,
      })
        .populate("userid")
        .exec();

      const formattedAppointments = appointments.map((appointment) => {
        return {
          _id: appointment._id,
          date: appointment.date,
          time: appointment.time,
          isTimeSlotAvailable: appointment.isTimeSlotAvailable,
          carDetails: {
            make: appointment.userid.carDetails.make,
            model: appointment.userid.carDetails.model,
            year: appointment.userid.carDetails.year,
            color: appointment.userid.carDetails.color,
            numberPlate: appointment.userid.carDetails.numberPlate,
          },
          user_id: appointment.userid._id,
          appointments: appointment.userid.appointment,
          fname: appointment.userid.fname,
          lname: appointment.userid.lname,
          license: appointment.userid.license,
          username: appointment.userid.username,
          password: appointment.userid.password,
          userType: appointment.userid.userType,
          age: appointment.userid.age,
          dob: appointment.userid.dob,
          __v: appointment.userid.__v,
          userid: appointment.userid._id,
          testType: appointment.testType,
          __v: appointment.__v,
          comment: appointment.comment,
          passFail: appointment.passFail,
        };
      });
      // Render the 'examiner' view with formatted appointments data
      res.render("examiner", {
        appointments: formattedAppointments,
        userType: req.body.userType,
      });
    } catch (error) {
      console.error(error);
    }
  }
};
