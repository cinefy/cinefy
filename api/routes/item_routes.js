'use strict';

var Item = require('../models/Item');
var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/item', function(req, res) {
    Item.find({}, function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve item'});
      res.json(data);
    });
  });

  app.post('/item', function(req, res) {
    var newItem = new Item(req.body);
    newItem.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not save item'});

      res.json(data);
    });
  });
};
