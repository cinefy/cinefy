'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var User = sequelize.define('user', {
    name: Sequelize.STRING,
    password: sequelize.STRING,
    product: {type: sequelize.BOOLEAN, defaultValue: true},
    music: {type: sequelize.BOOLEAN, defaultValue: true},
    trivia: {type: sequelize.BOOLEAN, defaultValue: true},
    location: {type: sequelize.BOOLEAN, defaultValue: true}
  })

  return User;
};
