var sql = require('../lib/sqltype'),
    bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/items', function(req, res) {
    sql.sequelize.query(""
      ).then(function(items) {
        res.json(items);
      });
  });
};