const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  image: {
    publicId: String,
    url: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  patient: [{ type: mongoose.Types.ObjectId, ref: "patients" }],
});

module.exports = mongoose.models.users || mongoose.model("user", userSchema);
