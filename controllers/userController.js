//@desc Get a user's info
//@troute POST /api/users/get
//@access PUBLIC

const User = require("../models/userModel");

const getUser = (req, res) => {
  console.log("REQ BODY" + req);
  User.find({ _id: req.body.userID }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(200).json(user);
    }
  });
};

module.exports = {
  getUser,
};
