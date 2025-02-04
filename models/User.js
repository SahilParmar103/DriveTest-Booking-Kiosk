//define schema for each collection

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

//structure for collection
const UserDetailsSchema = new Schema({
  appointment: {
    type: Array,
    ref: "Appointment",
    default: [],
    testType: "G2",
  },
  fname: {
    type: String,
    required: true,
    default: "John",
  },
  lname: {
    type: String,
    required: true,
    default: "Wick",
  },
  license: {
    type: String,
    required: true,
    default: "AB11CDE",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "Driver",
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  dob: {
    type: Date,
    required: true,
    default: "2005-02-08",
  },
  carDetails: {
    make: {
      type: String,
      required: true,
      default: "Audi",
    },
    model: {
      type: String,
      required: true,
      default: "Q7",
    },
    year: {
      type: Date,
      required: true,
      default: "2000",
    },
    color: {
      type: String,
      required: true,
      default: "Yellow",
    },
    numberPlate: {
      type: Number,
      required: true,
      default: 123654585552,
    },
  },
});

//pre ==> if we need to modify any data before saving data to database. next() tells mongoose to move forward
UserDetailsSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.license, 10, (error, hash) => {
    user.license = hash;
    next();
  });
});

UserDetailsSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

//link the schema to collection
const UserDetails = mongoose.model("User", UserDetailsSchema);
//('Collection_name',schema_name)

//export schema as module to be used in other files
module.exports = UserDetails;
