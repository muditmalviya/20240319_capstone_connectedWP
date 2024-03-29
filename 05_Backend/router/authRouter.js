// Importing express and initializing the router
const express = require("express");
const router = express.Router();

// Importing the authentication controller
const authController = require("../controllers/authController");

// Route for user registration
router.post("/signup", authController.register);

// Route for user login
router.post("/signin", authController.login);

// Exporting the router module
module.exports = router;