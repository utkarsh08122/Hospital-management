const Emp = require("../models/emp.schema");
const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient.schema");

const { error, generetAccessToken, success } = require("./responsControllers");

const emplogin = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      speciality,
      address,
      phone_No,
      age,
      experience,
      password,
      post,
      image,
      degree,
      fees,
      about,
    } = req.body;

    // if (
    //   !name ||
    //   !email ||
    //   !speciality ||
    //   !address ||
    //   !phone_No ||
    //   !age ||
    //   !experience ||
    //   !password ||
    //   !degree ||
    //   !image ||
    //   !fees ||
    //   !post
    // ) {
    //   res.status(400).send("all filds are required");
    // }
    console.log("in the login process");
    const olduser = await Emp.findOne({ email });
    if (olduser) {
      res.status(400).send("user is all ready exist");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const cloudImg = await cloudinary.uploader.upload(image); //asvav
    const user = await Emp.create({
      name,
      email,
      password: hashPassword,
      post: "Doctor",
      phone_No: "123456789",
      specialist: speciality,
      experience,
      age: "20 Year",
      address,
      fees,
      about,
      degree,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });

    return res.json(success(201, "user created", "no"));
  } catch (e) {
    console.log(e);
  }
};

const updateEmp = async (req, res) => {
  try {
    const { empToken, userData } = req.body;
    const { id } = jwt.decode(empToken);

    const {
      name,
      specialist,
      address,
      phone_No,
      age,
      experience,
      post,
      image,
      fee,
      about,
    } = userData;

    if (image) {
      const cloudImg = await cloudinary.uploader.upload(image);
      await Emp.updateOne(
        { _id: id },
        {
          $set: {
            name,
            post,
            phone_No,
            specialist,
            experience,
            age,
            address,
            fee,
            about,
            image: {
              publicId: cloudImg.public_id,
              url: cloudImg.url,
            },
          },
        }
      );
    }
    await Emp.updateOne(
      { _id: id },
      {
        $set: {
          name,
          post,
          phone_No,
          specialist,
          experience,
          age,
          address,
          fee,
          about,
        },
      }
    );

    return res.json(success(201, "user updated", "no"));
  } catch (e) {
    console.log(e);
  }
};

const empdata = async (req, res) => {
  try {
    console.log("on the emp data");
    const { empToken } = req.body;
    console.log("this is the token ", empToken);
    const { id } = jwt.decode(empToken);
    console.log("empt data", id);
    const emp = await Emp.findById({ _id: id });
    console.log(emp);
    return res.json(success(201, emp, "no"));
  } catch (e) {
    console.log(e);
  }
};
const allEmpdata = async (req, res) => {
  try {
    const emp = await Emp.find();
    return res.json(success(201, emp, "no"));
  } catch (e) {
    console.log(e);
  }
};
const appointment = async (req, res) => {
  try {
    const { token } = await req.body;
      const { id } = jwt.decode(token);
      const patient = await Patient.find({ docId: id });
    console.log("this si the ", patient);
    return res.json(success(201, patient, "no"));
  } catch (e) {
    console.log(e);
  }
};
const allDoctor = async (req, res) => {
  try {
    const emp = await Emp.find({ post: "Doctor" });
    return res.json(success(201, emp, "no"));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  emplogin,
  empdata,
  updateEmp,
  allEmpdata,
  appointment,
  allDoctor,
};
