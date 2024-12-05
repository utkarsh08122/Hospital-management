const mongoose = require("mongoose");
const empSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  post: {
    type: String,
  },
  phone_No: {
    type: String,
  },
  specialist: {
    type: String,
  },
  experience: {
    type: String,
  },
  age: {
    type: String,
  },
  address: {
    type: String,
  },
  about: {
    type: String,
  },
  fees: {
    type: String,
  },

  degree: {
    type: String,
  },

  image: {
    publicId: String,
    url: String,
  },
  patient: [{ type: mongoose.Types.ObjectId, ref: "patients" }],
});
module.exports = mongoose.models.emps || mongoose.model("emp", empSchema);
