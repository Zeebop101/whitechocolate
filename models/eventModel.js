const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
