'use strict';

var User = require('../models/User');
var Item = require('../models/Item');
var eat_auth = require('../lib/eat_auth');

var bodyparser = require('body-parser');

module.exports = function(app, passport, appSecret) {
  app.use(bodyparser.json());

  //create user
  app.post('/create_user', function(req, res) {
    User.findOne({"basic.name": req.body.name}, function(err, user) {
      if(user !== null) return res.json({msg: 'user already created'});
      var newUser = new User();
      newUser.basic.name = req.body.name;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.save(function(err, user) {
        if(err) return res.status(500).send({'msg': 'could not save user'});
        user.generateToken(appSecret, function(err, token) {
          if(err) return res.status(500).send({msg: 'could not generate toekn'});
          res.json({eat: token});
        });
      });
    });
  });

  //sign in
  app.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(appSecret, function(err, token) {
      if(err) return res.status(500).send({msg: 'could not generate token'});
      res.json({eat: token});
    });
  });

  //delete user
  app.delete('/delete_user/:name', eat_auth(appSecret), function(req, res) {
    User.findOneAndRemove({"basic.name": req.params.name}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not remove'});
      res.json(data);
    });
  });

  //like item
  app.put('/like_item/:item', eat_auth(appSecret), function(req, res) {
    
    //find appropriate user in db
    User.findOne({"basic.name": req.body.name}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not like item'});
      var newUser = data;
      
      //find appropriate item obj in db
      Item.findOne({"name": req.params.item}, function(err, data) {
        if(err) return res.status(500).send({'msg': 'could not find item'});
        var item = data;

        newUser.likes.push(item);

        //update user in db
        User.findOneAndUpdate({"basic.name": req.body.name}, newUser, function(err, data) {
          if(err) return res.status(500).send({'msg': 'could not like item'});
          res.json(data);
        });
      });
    });
  });

  app.get('/get_likes/:name', eat_auth(appSecret), function(req, res) {
    User.findOne({"basic.name": req.params.name}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not retrieve liked list'});
      res.json(data.likes);
    });
  });
};
