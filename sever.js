const indexController = require('./controllers/indexController');
const dashboardController = require('./controllers/dashboardController');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');

app.use('/', indexController);
app.use('/dashboard', dashboardController);
app.use('/auth', authController);
app.use('/post', postController);
