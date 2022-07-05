const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {Logger} = require('./utilities/logger');
const {nodeEnv, db, sessionSecret} = require('./config/config');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fileUpload = require('express-fileupload');


const app = express();

// MySql Store setup
const options = {
  host: db.host,
  port: 3306,
  user: db.username,
  password: db.password,
  database: db.database
};
const sessionStore = new MySQLStore(options);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    secure: nodeEnv === 'production',
    maxAge: 1000*60*60*24*7
  }
}))

// passport authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utilities/passport');

//this logout function must stay in app.js in order to access the
//session store.
app.get('/api/logout', function (req, res){
  sessionStore.destroy(req.sessionID, (err) =>{

  });
  req.logOut();
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.status(200).send({message : "User Logged out"});
  });

});

app.use(require('./utilities/userIdentity'));

// routes
app.use('/api/log', require('./routes/openRoutes/logRoutes'));
app.use('/api/auth', require('./routes/openRoutes/authRoutes'));
app.use('/api/user', require('./routes/openRoutes/userRoutes'));

// admin only routes
app.use('/api/admin/courses', require('./routes/adminRoutes/courseRoutes'));
app.use('/api/admin/images', require('./routes/adminRoutes/imageRoutes'));

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
