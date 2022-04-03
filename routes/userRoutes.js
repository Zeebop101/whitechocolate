const express = require("express");
const { getUser } = require("../controllers/userController");
const router = express.Router();

router.post("/get-user", getUser);

module.exports = router;
