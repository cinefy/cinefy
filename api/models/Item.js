'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Item = sequelize.define('movie_items', {
    movie_name: Sequelize.STRING,
    picture: Sequelize.STRING,
    item_type: Sequelize.STRING,
    item_name: Sequelize.STRING,
    time_in_movie: Sequelize.INTEGER
  });

  return Item;
};