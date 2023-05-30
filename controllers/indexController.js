const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET /
router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts from the database
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
    });

    // Render the homepage view and pass the blog posts data to the view
    res.render('index', { posts });
  } catch (error) {
    console.error('Error during homepage retrieval:', error);
    res.render('index', { errorMessage: 'An error occurred during homepage retrieval' });
  }
});

module.exports = router;

