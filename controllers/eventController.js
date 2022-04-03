const Event = require('../models/eventModel');
const fs = require('fs');
const path = require('path');

// @desc    Adds a new event
// @route   POST /api/events/add
// @access  Public
const addEvent = (req, res) => {
  const data = req.body;
  const file = req.files.file;
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'client',
    'public',
    'images',
    'events',
    `${file.name}`
  );
  file.mv(filePath);
  Event.create(
    {
      date: data.date,
      title: data.title,
      location: data.location,
      image: `./images/events/${file.name}`,
    },
    (err, createdEvent) => {
      if (err) {
        res.status(400).send('Error entering data into the db!');
      } else {
        res.status(200).json(createdEvent);
      }
    }
  );
};

// @desc    Gets all events
// @route   GET /api/events/get-all
// @access  Public
const getAllEvents = (req, res) => {
  Event.find({}, (err, allEvents) => {
    if (err) {
      res.status(400).send('Error getting all events!');
    } else {
      res.status(200).json(allEvents);
    }
  });
};

module.exports = {
  addEvent,
  getAllEvents,
};
