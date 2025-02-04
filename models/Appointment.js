//define schema for each collection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isTimeSlotAvailable: { type: Boolean, default: true },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  testType: {},
  comment: {},
  passFail: {},
});

// create a compound index on the "date" and "time" fields
appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

//link the schema to collection
const AppointmentDetails = mongoose.model("Appointment", appointmentSchema);
//('Collection_name',schema_name)

//export schema as module to be used in other files
module.exports = AppointmentDetails;
