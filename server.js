require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');
const nodemailer = require('nodemailer');
const router = express.Router();


// database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
}).catch(err => {
    console.log('Connection failed')
});

// Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


// routes
require('./routes/web')(app);

app.use((req, res) => {
    res.status(404).render('errors/404')
})



//Contact US Recieving Email
app.use(express.static('resources'));
app.use(express.json());
app.use('/', router);  


app.post('/', (req, res)=> {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'developizza@gmail.com',
            pass: 'kgvyfnohsweptqcz'
        }
    })

    const mailOption = {
        from: req.body.cemail,
        to: 'developizza@gmail.com',
        subject: `Message from ${req.body.cemail}: ${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOption,(error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }
        else
        {
            console.log('Email sent: '+ info.response)
            res.send('success')
        }
    })
})



app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});