const express = require("express");
const {
  addTicket,
  getTicketInformation,
  getLatestTicket,
} = require("../controllers/ticketController");
const router = express.Router();

router.post("/add", addTicket);
router.get("/info", getTicketInformation);
router.get("/get-latest-ticket", getLatestTicket);

module.exports = router;
