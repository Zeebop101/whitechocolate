const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

// @desc    Adds a new admin
// @route   POST /api/admin/add
// @access  Public
const addAdmin = (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, 6).then((hashedPassword) => {
    Admin.create(
      {
        name: data.name,
        username: data.username,
        password: hashedPassword,
      },
      (err, admin) => {
        if (err) {
          res.status(400).send('Failed to add admin!');
        } else {
          res.status(201).json({
            _id: admin._id,
            name: admin.name,
            username: admin.username,
          });
        }
      }
    );
  });
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = (req, res) => {
  const data = req.body;
  Admin.findOne({ username: data.username }, (err, admin) => {
    if (admin) {
      bcrypt.compare(data.password, admin.password).then((isMatch) => {
        if (isMatch) {
          res.status(200).json({
            _id: admin._id,
            name: admin.name,
            username: admin.username,
          });
        } else {
          res.status(400).json({
            //username found, but incorrect password
            isUsernameMatch: true,
            isPasswordMatch: false,
          });
        }
      });
    } else {
      //username not found
      res.status(400).json({
        isUsernameMatch: false,
      });
    }
  });
};

module.exports = {
  addAdmin,
  loginAdmin,
};
