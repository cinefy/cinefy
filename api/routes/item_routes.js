'use strict';

var Item = require('../models/Item'),
    sql = require('../lib/sqltype'),
    bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/items', function(req,res) {
    sql.sequelize.query("SELECT picture, item_name, time_in_movie FROM movie_items INNER JOIN user ON (product = item_type) OR (music = item_type) OR (trivia = item_type) OR (location = item_type);"
  ).then(function(items) {
    res.json(items);
    });
  });

};