const router = require("express").Router();
const authController = require("../contollers/authController");

router.post("/signup", authController.signupConntroler);
router.post("/login", authController.loginConntroler);

module.exports = router;
