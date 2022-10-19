var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose')

var indexRouter = require('./routes/login');
var usersRouter = require('./routes/user');
var admin = require('./routes/admin')
var index = require('./routes/index')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// const url="mongodb://18.209.70.80:27017/willprojectdb"
const url =process.env.url1

// const url="mongodb+srv://prabhjot:123@cluster0.6tgh1i7.mongodb.net/?retryWrites=true&w=majority"
// const url  = "mongodb+srv://prabhjot:123@cluster0.jbxelza.mongodb.net/?retryWrites=true&w=majority"
// const url="mongodb+srv://prabhjot:123@willproject.9iyxjmj.mongodb.net/?retryWrites=true&w=majority"
// const url= "mongodb://admin:CH4lfxWdceONAOea@SG-wilproject-54518.servers.mongodirector.com:27017/admin?ssl=true"
// const url ="mongodb+srv://prabhjot:123@cluster0.qxjkwao.mongodb.net/?retryWrites=true&w=majority"

  
mongoose.connect(url,{useNewUrlParser:true,   
})


const con = mongoose.connection
con.on('error',console.error.bind(console,"connection EROOR"))
con.once("open", function () {
console.log("Connected successfully to database");
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin',admin);
app.use('/index',index);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
