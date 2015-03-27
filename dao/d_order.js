/**
 * New node file
 */

module.exports = function (app) {
  var util = require('../util');
  var db = app.db;
  var P = app.Promise;
  var dao = {};

  dao.getById = function (id, t) {
    return db.Order.find(util.addTrans(t, {where: {id: id}}));
  }

  dao.getUserOrders = function (username, options, t) {
    return dao.User.getByUsername(username, util.addTrans(t, {}))
      .then(function(user) {
        if (!user) util.throwError(200, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no User with username: ' + username);
        return user.getOrders(options);
      })
  }

  dao.create = function (order_data, username, t) {
    return dao.User.getByUsername(username, t)
      .then(function(user) {
        return db.Order.create(order_data, util.addTrans(t, {})).then(function(order) {
          return {user: user, order: order}
        });
      })
      .catch(util.throwError(200, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no User with username: ' + username))
      .then(function (result) {
        return result.order.setUser(result.user, util.addTrans(t, {}))
      });
  }

  return dao;
}