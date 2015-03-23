'use strict';

var User = require('../models/User'),
    sql = require('../lib/sqltype'),
    bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  //create user
  app.post('/create_user', function(req, res) {
    sql.User.create({
      name: req.body.name,
      password: req.body.password
    }).then(function(user) {
      res.json(user);
    },
    function() {
      res.status(500).send({msg: 'could not create user'});
    });
  });


  //sign in
  app.get('/sign_in', function(req, res) {
    sql.User.find({
      name: req.body.name,
      password: req.body.password
    }).then(function(user) {
      res.json(user);
    }, function() {
      res.status(500).send({msg: 'could not retrieve user'});
    });
  });


  //update preferences
  app.put('/preferences/:name', function(req, res) {
    sql.User.update(
      //Set attribute values
      {
        product: req.body.product,
        trivia: req.body.trivia,
        music: req.body.music,
        location: req.body.location
      },
      //where cluase
      {
        name: req.params.name
      }
    ).then(function(user) {
      res.json({msg: 'preferences updated'});
    }, function() {
      res.status(500).send({msg: 'could update user'});
    });
  });


  //delete user
  app.delete('/delete_user/:name', function(req, res) {
    sql.User.destroy({
      where: {
        name: req.params.name
      }
    }).then(function(n) {
      res.json({msg:  n + 'rows deleted'});
    }, function() {
      res.status(500).send({msg: 'could not delete user'});
    });
  });
};

