const Appointment = require("../models/Appointment");
const User = require("../models/User");

module.exports = async (req, res) => {
  const appointmentId = req.body.app_id;
  const userId = req.body.user_id;
  const passFail = req.body.passFail;
  const comment = req.body.comment;

  await Appointment.updateOne(
    { _id: appointmentId },
    {
      $set: {
        _id: appointmentId,
        comment: comment,
        passFail: passFail,
        userid: userId,
      },
    }
  );
  try {
    const appointments = await Appointment.find({
      testType: { $in: ["G2", "G"] },
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

    res.render("examiner", {
      appointments: formattedAppointments,
      userType: req.body.userType,
    });
  } catch (error) {
    console.error(error);
  }
};
