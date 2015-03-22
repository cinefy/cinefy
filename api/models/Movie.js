'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Movie = sequelize.define('movie', {
    movie_title: Sequelize.STRING,
    video_link: Sequelize.STRING
  });

  return Movie;
};