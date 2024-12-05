const User = require("../models/user.schema");
const Emp = require("../models/emp.schema");
const bcrypt = require("bcrypt");
const { error, generetAccessToken, success } = require("./responsControllers");

const signupConntroler = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400).send("all filds are required");
    }
    const olduser = await User.findOne({ email });
    if (olduser) {
      return res.json(error(400, "user is all ready exist", "no"));
    }
    if (email === "admin@gmail.com") {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      await Emp.create({
        name,
        email,
        password: hashPassword,
      });

      return res.json(success(201, "user created", "no"));
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.json(success(201, "user created", "no"));
  } catch (e) {
    console.log(e);
  }
};
const loginConntroler = async (req, res) => {
  try {
    console.log("in the login sever");
    console.log("req", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("all filds are required");
    }
    const user = await User.findOne({ email });
    const emp = await Emp.findOne({ email });

    let post = "accessToken";

    if (!user && !emp) {
      return res.json(error(404, "User is not exist"));
    }

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.json(error(406, "Password is wrong"));
      }
      post = "accessToken";

      const tokenData = {
        id: user._id,
      };
      const accessToken = generetAccessToken(tokenData);

      const rewww = res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
      });

      return res.json(success(200, accessToken, post));
    }
    if (emp) {
      const match = await bcrypt.compare(password, emp.password);
      if (!match) {
        return res.json(error(406, "Password is wrong"));
      }
      post = "empToken";
      if (email === "admin@gmail.com") {
        post = "adminToken";
      }

      const tokenData = {
        id: emp._id,
      };
      const accessToken = generetAccessToken(tokenData);

      const rewww = res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
      });
      console.log(rewww);

      return res.json(success(200, accessToken, post));
    }
    return;
  } catch (e) {
    console.log("this is error", e);
  }
};

module.exports = {
  signupConntroler,
  loginConntroler,
};
