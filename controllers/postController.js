const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET /post/create
router.get('/create', (req, res) => {
  // Render the create post view
  res.render('create');
});

// POST /post/create
router.post('/create', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Create a new post in the database
    await Post.create({ title, content });

    // Post creation successful, redirect to the dashboard or homepage
    // You can customize the redirect based on your application flow
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during post creation:', error);
    res.render('create', { errorMessage: 'An error occurred during post creation' });
  }
});

// GET /post/edit/:id
router.get('/edit/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post with the provided ID in the database
    const post = await Post.findByPk(postId);

    // Post not found, redirect to the dashboard or homepage with error message
    if (!post) {
      return res.redirect('/dashboard', { errorMessage: 'Post not found' });
    }

    // Render the edit post view and pass the retrieved post data to the view
    res.render('edit', { post });
  } catch (error) {
    console.error('Error during post retrieval:', error);
    res.redirect('/dashboard', { errorMessage: 'An error occurred during post retrieval' });
  }
});

// POST /post/edit/:id
router.post('/edit/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    // Find the post with the provided ID in the database
    const post = await Post.findByPk(postId);

    // Post not found, redirect to the dashboard or homepage with error message
    if (!post) {
      return res.redirect('/dashboard', { errorMessage: 'Post not found' });
    }

    // Update the post's title and content
    await post.update({ title, content });

    // Post update successful, redirect to the dashboard or homepage
    // You can customize the redirect based on your application flow
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during post update:', error);
    res.redirect('/dashboard', { errorMessage: 'An error occurred during post update' });
  }
});

// POST /post/delete/:id
router.post('/delete/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    // Find the post with the provided ID in the database
    const post = await Post.findByPk(postId);

    // Post not found, redirect to the dashboard or homepage with error message
    if (!post) {
      return res.redirect('/dashboard', { errorMessage: 'Post not found' });
    }

    // Delete the post
    await post.destroy();

    // Post deletion successful, redirect to the dashboard or homepage
    // You can customize the redirect based on your application flow
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during post deletion:', error);
    res.redirect('/dashboard', { errorMessage: 'An error occurred during post deletion' });
  }
});

module.exports = router;
