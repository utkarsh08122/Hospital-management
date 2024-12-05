const User = require("../models/user.schema");
const { error, success } = require("./responsControllers");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient.schema");

const userData = async (req, res) => {
  try {
    const { accessToken } = req.body;
    const { id } = jwt.decode(accessToken);
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json(error(404, "User is not exist"));
    }
    return res.json(success(200, user));
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const { accessToken, userData } = req.body;
    const { id } = jwt.decode(accessToken);
    const { name, email, password, address, phone, gender, image } = userData;
    let cloudImg;
    if (image) {
      cloudImg = await cloudinary.uploader.upload(image);
      await User.updateOne(
        { _id: id },
        {
          $set: {
            name,
            email,
            password,
            image: {
              publicId: cloudImg.public_id,
              url: cloudImg.url,
            },
            address,
            phone,
            gender,
          },
        }
      );
    }
    await User.updateOne(
      { _id: id },
      {
        $set: {
          name,
          email,
          password,
          address,
          phone,
          gender,
        },
      }
    );
    return res.json(success(201, "user updated", "no"));
  } catch (e) {
    console.log(e);
  }
};

const appointment = async (req, res) => {
  try {
    const { token } = await req.body;
    const { id } = jwt.decode(token);
    const respons = await Patient.find({ ownerid: id });
    return res.json(success(201, respons, "no"));
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  userData,
  updateUser,
  appointment,
};
