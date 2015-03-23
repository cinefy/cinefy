'use strict';

var Item = require('../models/Item'),
    sql = require(),
    bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/items', function(req, res) {
    sql.sequelize.query("SELECT picture, item_name, time_in_movie FROM movie_items WHERE movie_name='" + req.body.moviename + "';"
      ).then(function(items) {
        res.json(items);
      });
  });
};