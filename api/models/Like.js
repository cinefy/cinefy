'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Like = sequelize.define('likes', {
    liked_user : Sequelize.STRING,
    liked_item_name : Sequelize.STRING
  });

  return Like;
};