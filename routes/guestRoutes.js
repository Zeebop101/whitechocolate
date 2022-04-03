const express = require("express");
const { addGuest, sendEmail } = require("../controllers/guestController");
const router = express.Router();

router.post("/add", addGuest);
router.post("/send-email", sendEmail);

// router.get("/info", getTicketInformation);

module.exports = router;
