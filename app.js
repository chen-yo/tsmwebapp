require('dotenv').config();
var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let checkAuth = require('./authenticate');
const { ValidationError } = require('./errors');

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var filtersRouter = require('./routes/filters');
var dashboardRouter = require('./routes/dashboard');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.post('/test', checkAuth, (req, res) => {
  res.send('You are authenticated!!!');
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/filters', filtersRouter);
app.use('/api/dashboard', dashboardRouter);

// handle unexpected requests (not found)
app.use('*', (req, res, next) => {
  let error = new Error('Resource not found');
  error.statusCode = 404;
  throw error;
});

app.use((error, req, res, next) => {
  const errorReply = {
    message: error.message,
    name: error.name
  };

  if (!error.statusCode) {
    errorReply.statusCode = 500; // server error
  } else {
    errorReply.statusCode = error.statusCode;
  }

  if (error instanceof ValidationError) {
    errorReply.errors = error.errorFields;
  }

  console.error('An error occured ', errorReply);

  return res.status(errorReply.statusCode).json(errorReply);
});

module.exports = app;
