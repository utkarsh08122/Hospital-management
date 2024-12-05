const router = require("express").Router();
const empRouter = require("../contollers/emplogin");
router.post("/login", empRouter.emplogin);
router.post("/data", empRouter.empdata);
router.post("/update", empRouter.updateEmp);
router.get("/all", empRouter.allEmpdata);
router.post("/appointment", empRouter.appointment);
router.get("/allDoctor", empRouter.allDoctor);

module.exports = router;
