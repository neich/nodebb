module.exports = function (app) {

  var P = app.Promise;
  var db = app.db;

  var util = require('../util');
  var dao = require('../dao')(app);

  return {
    create: function (req, res) {
      util.checkParams(req.body, ['description', 'date']);

      db.sequelize.transaction(function (t) {
        return dao.User.getByUsername(req.session.username, t)
          .then(function (user) {
            if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from token does not exist");
            else return dao.Order.create(req.body, user, t);
          })
      })
        .then(util.jsonResponse.bind(util, res))
        .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
        .done();
    },

    getById: function (req, res) {
      if (!req.params.id) util.stdErr500(res, "Missing parameter 'id'");
      else
        db.Order.find({where: {id: req.params.id, include: [Client, Shop]}})
          .success(util.stdSeqSuccess.bindLeft(res), util.stdSeqError.bindLeft(res))
          .done();
    },

    getOrders: function (req, res) {
      dao.Order.getUserOrders(req.session.username, {})
        .then(util.jsonResponse.bind(util, res))
        .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
        .done();
    }
  }
}
