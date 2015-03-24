'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: String,

  picture: String,

  time: Number
});

module.exports = mongoose.model('Item', itemSchema);
