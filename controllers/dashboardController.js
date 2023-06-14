const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');

module.exports = (sequelize) => {
  // GET /dashboard
  router.get('/', requireAuth, async (req, res) => {
    try {
      // Fetch the user's blog posts from the database using the Sequelize instance
      const posts = await Post.findAll({
        where: {
          userId: req.user.id, // Fetch posts belonging to the currently logged-in user
        },
        include: {
          model: User,
          attributes: ['username'],
        },
        order: [['createdAt', 'DESC']],
      });

      // Render the dashboard view and pass the user's blog posts data to the view
      res.render('dashboard', { posts });
    } catch (error) {
      console.error('Error during dashboard retrieval:', error);
      res.render('dashboard', { errorMessage: 'An error occurred during dashboard retrieval' });
    }
  });

  return router;
};


