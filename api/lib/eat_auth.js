'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(appSecret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if(!token) return res.status(403).send({msg: 'could not authenticate'});
    eat.decode(token, appSecret, function(err, decoded) {
      if(err) return res.status(403).send({msg: 'could not decode'});
      User.findOne({_id: decoded.id}, function(err, user) {
        if(err) return res.status(403).send({msg: 'could process findOne'});

        if(!user) return res.status(403).send({msg: 'could not find user'});

        req.user = user;
        next();
      });
    });
  };
};
