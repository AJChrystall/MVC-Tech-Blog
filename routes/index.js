const router = require('express').Router();

const {
    indexController,
    dashboardController,
    authController,
    postController,
} = require('../controllers');


router.use('/', indexController);
router.use('/dashboard', dashboardController);
router.use('/auth', authController);
router.use('/post', postController);

module.exports = router;
