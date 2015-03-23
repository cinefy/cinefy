'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  password: String,

  likes: [String],
});

module.exports = mongoose.model('User', userSchema);