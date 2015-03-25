'use strict';

var Item = require('../models/Item');
var bodyparser = require('body-parser');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.get('/item', eat_auth(appSecret), function(req, res) {
    Item.find({}, function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve item'});
      res.json(data);
    });
  });

  app.post('/item', eat_auth(appSecret), function(req, res) {
    var newItem = new Item();
    newItem.name = req.body.name;
    newItem.picture = req.body.picture;
    newItem.time = req.body.time;
    newItem.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not save item'});

      res.json(data);
    });
  });
};
