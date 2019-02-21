var OrderModel = require('../models/m_order');

var OrderCollection = Backbone.Collection.extend({
  model: OrderModel,
  url: "/api/orders"
});

module.exports = OrderCollection;
