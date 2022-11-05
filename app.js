const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
var md5 = require("blueimp-md5");

//passport config:
require('./depends_config/passport')(passport)
//mongoose
mongoose.connect('mongodb://localhost:27017/accounts',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('Connected to accoounts database.'))
.catch((err)=> console.log(err));
//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'urmum',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
    
//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
//API
app.get('/api/:apikey/getuser/:userid', require('./api/getuser.js'));
app.get('/api/:apikey/newuser/:name/:email/:password/:password2', require('./api/newuser.js'));
app.get('/api/:apikey/auth/:email/:password', require('./api/auth.js'))
//email-verification
app.get('/verify/:token/:emailmd5', require('./api/email_verify.js'));
//oAuth2 requests


app.listen(3000); 