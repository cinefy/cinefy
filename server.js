'use strict';

var express = require('express');
var mongoose = require('mongoose');
var itemRoute = require('./api/routes/item_routes');
var userRoute = require('./api/routes/user_routes');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/cinefy_development');

var app = express();

app.set('appSecret', process.env.SECRET || 'changethis');
app.use(passport.initialize());
require('./api/lib/passport')(passport);

var itemRouter = express.Router();
var userRouter = express.Router();

itemRoute(itemRouter, passport, app.get('appSecret'));
userRoute(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', itemRouter);
app.use('/api/v1', userRouter);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
