const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  try {
    // Fetch all appointments from the database and populate the "userid" field
    const appointments = await Appointment.find({}).populate("userid").exec();

    // Format the appointments data for rendering in the view
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
    // Render the "appointment" view with the formatted appointments data
    res.render("appointment", {
      appointments: formattedAppointments,
    });
  } catch (error) {
    // Catch any errors that may occur during execution and log them to the console
    console.error(error);
  }
};
