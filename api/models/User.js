'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var User = sequelize.define('user', {
    name: Sequelize.STRING,
    password: sequelize.STRING,
    product: {type: sequelize.STRING, defaultValue: 'product'},
    music: {type: sequelize.STRING, defaultValue: 'music'},
    trivia: {type: sequelize.STRING, defaultValue: 'trivia'},
    location: {type: sequelize.STRING, defaultValue: 'location'}
  });

  return User;
};
