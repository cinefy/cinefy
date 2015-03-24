'use strict';

var mongoose = require('mongoose');
var eat = require('eat');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  basic: {
    name: String,
    password: String
  },
  likes: [String]
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(appSecret, callback) {
  eat.encode({id: this._id, timestamp: new Date()}, appSecret, callback);
};

module.exports = mongoose.model('User', userSchema);
