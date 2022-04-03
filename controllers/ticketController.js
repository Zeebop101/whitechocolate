const Ticket = require("../models/ticketModel");
const fs = require("fs");
const path = require("path");
const { getStoreItems } = require("../storeItems");

// @desc    Adds a new ticket
// @route   POST /api/tickets/add
// @access  Public
const addTicket = (req, res) => {
  const { firstName, lastName, regular, premium, vip, date } = req.body;
  Ticket.create(
    {
      firstName: firstName,
      lastName: lastName,
      regular: regular,
      premium: premium,
      vip: vip,
      date: date,
    },
    (err, createdTicket) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error entering data into the db!");
      } else {
        res.status(200).json(createdTicket);
      }
    }
  );
};

// @desc    Adds a new ticket
// @route   GET /api/tickets/info
// @access  Public
const getTicketInformation = (req, res) => {
  // const storeItems = new Map([
  //   [1, { priceInEuro: 25, name: "Regular Ticket" }],
  //   [2, { priceInEuro: 35, name: "Premium Ticket" }],
  //   [3, { priceInEuro: 45, name: "VIP Ticket" }],
  // ]);
  let storeItems = getStoreItems();

  console.log(storeItems);

  if (storeItems) res.status(200).json(storeItems);
  else res.sendStatus(204);
};

// @desc    Gets the latest ticket created
// @route   GET /api/tickets/get-latest-ticket
// @access  Public
const getLatestTicket = (req, res) => {
  Ticket.findOne({}, {}, { sort: { _id: -1 } }, (err, latestTicket) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else if (latestTicket) res.status(200).json(latestTicket);
  });
};

module.exports = {
  addTicket,
  getTicketInformation,
  getLatestTicket,
};
