'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: String,

  picture: String,

  description: String,

  movie: String,

  cta: String,

  time: Number
});

module.exports = mongoose.model('Item', itemSchema);
