
module.exports = function (app) {

  var P = app.Promise;
  var db = app.db;

  var util = require('../util');
  var dao = require('../dao')(db);

  return {
    create: function (req, res) {
      util.checkParams(req.body, ['description', 'date']);

      db.sequelize.transaction(function (t) {
        P.all([dao.Client.getByEmail(req.body.client.email, t),
          dao.Shop.getByToken(req.body.token, t)])
          .spread(function (client, shop) {
            if (!shop)
              util.reject("No shop exists with token = " + token);
            if (client) return P.all([client, shop]);
            return P.all([dao.Client.createWithShop(req.body.client, shop, t), shop]);
          })
          .spread(function (client, shop) {
            return dao.Order.create(req.body.order, client, shop, t);
          })
          .then(util.commit.bindLeft(t), util.rollback.bindLeft(t))
          .then(util.stdSeqSuccess.bindLeft(res), util.stdErr500.bindLeft(res))
          .done();
      });
    },

    getById: function (req, res) {
      if (!req.params.id) util.stdErr500(res, "Missing parameter 'id'");
      else
        db.Order.find({where: {id: req.params.id, include: [Client, Shop]}})
          .success(util.stdSeqSuccess.bindLeft(res), util.stdSeqError.bindLeft(res))
          .done();
    },

    getOrders: function (req, res) {
      dao.Order.getUserOrders(req.user.username)
        .then(util.jsonResponse.bind(util, res))
        .catch(util.resendError.bind(util, res))
        .done();
    }
  }
}
