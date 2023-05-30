const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// GET /login
router.get('/login', (req, res) => {
  // Render the login view
  res.render('login');
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const user = await User.findOne({ where: { username } });

    // User not found, redirect to login page with error message
    if (!user) {
      return res.render('login', { errorMessage: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Password doesn't match, redirect to login page with error message
    if (!passwordMatch) {
      return res.render('login', { errorMessage: 'Invalid username or password' });
    }

    // Authentication successful, redirect to the dashboard or homepage
    // You can customize the redirect based on your application flow
    res.redirect('/dashboard');
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
    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });

    // Username is taken, redirect to signup page with error message
    if (existingUser) {
      return res.render('signup', { errorMessage: 'Username is already taken' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await User.create({ username, password: hashedPassword });

    // User registration successful, redirect to the login page
    // You can customize the redirect based on your application flow
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.render('signup', { errorMessage: 'An error occurred during signup' });
  }
});

module.exports = router;
