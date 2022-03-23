var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mongochat").then(()=>{
  console.log("connected...")
}).catch(err => console.log(err));

/**
INCLUSIÓN MASIVA DE MODELOS
 */
var fs = require("fs"); //Para hacer una inclusión masiva a la carpeta de modelos

fs.readdirSync( __dirname + '/modelos' ).forEach(function( filename ){
  if (~filename.indexOf('.js')){
      require ( __dirname + '/modelos/' + filename );
  }
});

/**
 FIN INCLUSIÓN MASIVA DE MODELOS
 */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatsRouter = require('./routes/chats');
var filesRouter = require('./routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);
app.use('/files', filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
