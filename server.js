const indexController = require('./controllers/indexController');
const dashboardController = require('./controllers/dashboardController');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', indexController);
app.use('/dashboard', dashboardController);
app.use('/auth', authController);
app.use('/post', postController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
