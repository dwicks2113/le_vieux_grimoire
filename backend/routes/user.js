const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user'); // Import the user controller

router.post('/signup', userCtrl.signup); // Use the controller for user signup
router.post('/login', userCtrl.login); // Use the controller for user login

module.exports = router; // Export the router