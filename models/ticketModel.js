const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  regular: {
    type: Number,
    required: false,
  },
  premium: {
    type: Number,
    required: false,
  },
  vip: {
    type: Number,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
