const router = require("express").Router();
const appoinment = require("../contollers/appoinment");

router.post("/appoinmentbooking", appoinment.appointmentBooking);
router.post("/allappoinment", appoinment.appointment);

module.exports = router;
