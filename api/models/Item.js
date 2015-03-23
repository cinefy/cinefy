'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: String,

  picture: String,

  time: String,
});

module.exports('Item', itemSchema);
