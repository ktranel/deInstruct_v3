const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {Logger} = require('./utilities/logger');
const {nodeEnv} = require('./config/config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/open', require('./routes/openRoutes/userRoutes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = nodeEnv === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (nodeEnv === 'development') console.log(err);
  const logs = new Logger();
  logs.error(err, {
    url: req.originalUrl,
    body: req.body,
    query: req.query,
    params: req.params,
    user: req.user ? req.user.id : req.user,
  });
});

process.on('unhandledRejection', error => {
  if (nodeEnv === 'development') console.log(error);
  const logs = new Logger();
  logs.error(err);
});

module.exports = app;
