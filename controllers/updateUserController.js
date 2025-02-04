const UserDetails = require("../models/User");
const bcrypt = require("bcrypt");
//Updating the car details for the user in the database and notifying the user with success alert
module.exports = async (req, res) => {
  let data = {
    fname: req.body ? req.body.fname : "",
    lname: req.body ? req.body.lname : "",
    username: req.body ? req.body.username : "",
    password: req.body ? req.body.password : "",
    userType: req.body ? req.body.userType : "",
    license: req.body ? req.body.license : "",
    age: req.body ? req.body.age : "",
    dob: req.body ? req.body.dob : "",
    carDetails: {
      make: req.body ? req.body.make : "",
      model: req.body ? req.body.model : "",
      year: req.body ? req.body.year : "",
      color: req.body ? req.body.color : "",
      numberPlate: req.body ? req.body.numberPlate : "",
    },
  };

  try {
    bcrypt.hash(data.license, 10, async (err, hash) => {
      data.license = hash;
      await UserDetails.updateOne(
        {
          _id: req.session.userId,
        },
        {
          $set: data,
        }
      );
      const logeedInUser = await UserDetails.findOne({
        _id: req.session.userId,
      });
      const userData = logeedInUser ? logeedInUser : "";

      return res.render("g2", {
        userData,
        success: "Record updated successfully!!",
        failure: "",
        date: null,
        timeslots: [],
        bookSuccessMessage: "",
      });
    });
  } catch (error) {
    const logeedInUser = await UserDetails.findOne({
      _id: req.session.userId,
    });
    const userData = logeedInUser ? logeedInUser : "";

    return res.render("g2", {
      userData,
      success: "",
      failure: "Registration not saved ! Please try again." + error,
      date: null,
      timeslots: [],
      bookSuccessMessage: "",
    });
  }
};
