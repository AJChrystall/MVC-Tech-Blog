const router = require('express').Router();
const { Post } = require('../models');


  // GET /
  router.get('/', async (req, res) => {
    res.render('home');
  });

  module.exports = router



