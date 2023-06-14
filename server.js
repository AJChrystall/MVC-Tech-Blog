const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    //helpers,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set the views directory


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes)

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
