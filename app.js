var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
require('dotenv').config();
const mongoose = require('mongoose')



const events = require('./models/events')


var LoginRouter = require('./routes/login');
var usersRouter = require('./routes/user');
var admin = require('./routes/admin')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:"hellomynameisprabhjot",cookie: { secure: !true }}))



 const url =process.env.url1



try {

    
  
mongoose.connect(url,{useNewUrlParser:true,   
})


const con = mongoose.connection
con.on('error',console.error.bind(console,"connection EROOR"))
con.once("open", function () {
console.log("Connected successfully to database");
});}
catch (error) {
    console.log(error)
}



app.get('/',(req,res)=>{
     events.find((err,doc)=>{

    res.render('page-4',{doc})
  })
})




app.use('/login', LoginRouter);
app.use('/user', usersRouter);
app.use('/admin',admin);





module.exports = app;
