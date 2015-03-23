'use strict';

var Sequelize = require('sequelize'),
    url = require('url');

module.exports = function() {
  var sequelize = new Sequelize('cinefy_db', 'callum', null, {
    host: 'localhost',
    dialect: 'mysql'
  });
  var Item = require('../models/Item')(sequelize),
      Like = require('../models/Like')(sequelize),
      Movie = require('../models/Movie')(sequelize);
  return {
    sequelize: sequelize,
    Item: Item,
    Like: Like,
    Movie: Movie,
    start: function(callback){
      Movie.sync({force: false})
      .then(function() {
        return Item.sync({force: false})
        .then(function() {
          return Like.sync({force: false})
          .then(callback);
        });
      });
    }
  };
};