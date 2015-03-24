'use strict';

var express = require('express');
var mongoose = require('mongoose');
var itemRoute = require('./api/routes/item_routes');
// var userRoute = require('./api/routes/user_routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/cinefy_development');

var app = express();

var itemRouter = express.Router();
// var userRouter = express.Router();

itemRoute(itemRouter);
// userRoute(userRouter);

app.use('/api/v1', itemRouter);
// app.use('/api/v1', userRouter);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
