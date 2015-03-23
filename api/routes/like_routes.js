'use strict';

var Like = require('../models/Like'),
    sql = require(),
    bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.post('/like', function(req, res) {
    sql.Like.create({
      liked_user: req.body.liked_user,
      liked_item_name: req.body.liked_item
    }).then(function(like) {
      res.json(like);
    },
    function() {
      res.status(500).send({'msg': 'could not send new like'});
    });
  });
};