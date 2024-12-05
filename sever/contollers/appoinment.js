const User = require("../models/user.schema");
const Patient = require("../models/patient.schema");
const jwt = require("jsonwebtoken");
const { success } = require("./responsControllers");
const Emp = require("../models/emp.schema");

const appointmentBooking = async (req, res) => {
  try {
    const data = await req.body;
    const { addpatient, token } = data;
    const { id } = jwt.decode(token);

    const {
      patient_name,
      problem_description,
      doctor_name,
      address,
      Age,
      time,
      sex,
      date,
      day,
      weight,
      docId,
    } = await addpatient;

    const user = await User.findById({ _id: id });
    const emp = await Emp.findById({ _id: docId });
    const patientRespons = await Patient.create({
      doctor_name,
      ownerid: user._id,
      docId,
      patient_name,
      problem_description,
      address,
      age: Age,
      time,
      sex,
      date,
      day,
      weight,
      docId,
    });
    await user.patient.push(patientRespons._id);
    await emp.patient.push(patientRespons._id);
    await user.save();
    await emp.save();
    return res.json(success(201, "data save", "no"));
  } catch (e) {
    console.log(e);
  }
};
const appointment = async (req, res) => {
  try {
    const respons = await Patient.find();
    return res.json(success(201, respons, "no"));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  appointmentBooking,
  appointment,
};
