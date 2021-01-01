const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { Mongoose } = require('mongoose');
const app =express()

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)

require('./mongooseFileValidation')
app.use(express.json())

app.use(expressLayouts)
app.set('view engine','ejs');

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: true });


// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg')
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.error = req.flash('error')
    next()
})

//Routes
app.use('/',require('./routers/indexRouter'));
app.use('/task',require('./routers/taskRouter'));
app.use('/user',require('./routers/userRouter'));

module.exports = app
