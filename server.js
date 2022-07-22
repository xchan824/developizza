const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

// database connection
const url = 'mongodb+srv://user1:ECxUcWehwrkeOEBl@developizza.crveg2h.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, err => {
    if(err) throw err;
    console.log('Connected to database');
})

// assets
app.use(express.static('public'));

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// routes
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});