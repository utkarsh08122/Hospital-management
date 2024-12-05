const router = require("express").Router();
const userRouter = require("../contollers/userDataController");
router.post("/data", userRouter.userData);
router.post("/update", userRouter.updateUser);
router.post("/appointment", userRouter.appointment);
// router.post("/updateemp", userRouter);

module.exports = router;
