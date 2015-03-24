var express = require('express');
var mongoose = require('mongoose');
var itemRoute = require('./api/routes/item_routes');
var userRoute = require('./api/routes/user_routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/cinefy_development');

var app = express();

var itemRoute = express.Router();
var userRoute = express.Router();

app.use('/api/v1', itemRoute);
app.use('/api/v1', userRoute);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
