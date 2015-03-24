'use strict';

var User = require('../models/User');
var Item = require('../models/Item');

var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  //create user
  app.post('/create_user', function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not save user'});
      res.json(data);
    });
  });

  //sign in
  app.get('/sign_in', function(req, res) {
    User.findOne({name: req.body.name}, function(err, data) {
      if(err || !data.name) return res.status(500).send({'msg': 'could not retrieve user'});
      res.json(data);
    });
  });

  //delete user
  app.delete('/delete_user', function(req, res) {
    User.findOneAndRemove({name: req.body.name}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not remove'});
      res.json(data);
    });
  });

  //like item
  app.put('/like_item', function(req, res) {
    User.findOne({name: req.body.name}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not like item'});
      var newUser = data;
      newUser.likes.push(req.body.item);
      User.findOneAndUpdate({name: req.body.name}, newUser, function(err, data) {
        if(err) return res.status(500).send({'msg': 'could not like item'});
        res.json(data);
      });

    });
  });

  app.get('/get_likes', function(req, res) {
    User.findOne({name: req.body.name}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not retrieve liked list'});
      res.json(data.likes);
    });
  });
}
