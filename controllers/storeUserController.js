const UserDetails = require("../models/User");

module.exports = async (req, res) => {
  //storing the data as per the schema and checking if fields are undefined
  const data = {
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

  await UserDetails.create(data, (error, user) => {
    if (error) {
      return res.render("login", {
        success: "",
        failure: "Registration Failed ! Please try again.",
      });
    }
    return res.render("login", {
      success: "Record saved successfully!!",
      failure: "",
    });
  });
};
