const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  doctor_name: {
    type: String,
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  problem_description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Patients || mongoose.model("patient", patientSchema);
