const express = require('express');
const router = express.Router();

// Import the User model
const { User } = require('../models');

// GET /login
router.get('/login', (req, res) => {
  // Render the login view
  res.render('login');
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username using the Sequelize instance
    const user = await User.findOne({ where: { username } });

    // Rest of your code
    // ...
  } catch (error) {
    console.error('Error during login:', error);
    res.render('login', { errorMessage: 'An error occurred during login' });
  }
});

// GET /signup
router.get('/signup', (req, res) => {
  // Render the signup view
  res.render('signup');
});

// POST /signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken using the Sequelize instance
    const existingUser = await User.findOne({ where: { username } });

    // Rest of your code
    // ...
  } catch (error) {
    console.error('Error during signup:', error);
    res.render('signup', { errorMessage: 'An error occurred during signup' });
  }
});

module.exports = (sequelize) => {
  // Pass the Sequelize instance to the authController
  // You can associate the Sequelize instance with the User model in this function
  User.initialize(sequelize);
  return router;
};
