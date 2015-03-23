var express = require('express');
var Sequelize = require('sequelize');
var itemRoute = require('./api/routes/item_routes');
var likeRoute = require('./api/routes/like_routes');
// var movieRoute = require('./api/routes/movie_routes');

var sequelize = new Sequelize('mysql://localhost:3000/cinefy', {});

var app = express();
var router = express.Router();

itemRoute(router);
likeRoute(router);
// movieRoute(router);

app.listen((process.env.PORT || 3000), function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
