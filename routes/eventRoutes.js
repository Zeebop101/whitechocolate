const express = require('express');
const { addEvent, getAllEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/add', addEvent);
router.get('/get-all', getAllEvents);

module.exports = router;
