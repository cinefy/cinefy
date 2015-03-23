'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,

  password: String,

  likes: [String]
});

module.exports = mongoose.model('User', userSchema);
