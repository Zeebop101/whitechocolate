const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
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
  date: {
    type: Date,
    required: false,
  },
});

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
