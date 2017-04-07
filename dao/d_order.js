/**
 * New node file
 */

module.exports = function (app, dao) {
  var util = require('../util');
  var db = app.db;
  var P = app.Promise;
  var Order = {};

  Order.getById = function (id, t) {
    return db.Order.find(util.addTrans(t, {where: {id: id}}))
      .then(function(order) {
        if (!order) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Order with id: ' + id)
        else return order
      })
  }

  Order.getUserOrders = function (userId, options, t) {
    var opt = options || {};
    return dao.User.getById(userId, t)
      .then(function(user) {
        if (!user) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no User with id: ' + userId);
        return user.getOrders(util.addTrans(t, opt));
      })
  }

  Order.create = function (order_data, user, t) {
    return db.Order.create(order_data, util.addTrans(t, {}))
      .then(function(order) {
          return order.setUser(user, util.addTrans(t, {}))
        });
  }

  return Order;
}