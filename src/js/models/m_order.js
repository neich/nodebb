import Backbone from 'backbone';

const OrderModel = Backbone.Model.extend({
  urlRoot: "/api/orders"
});

export default OrderModel;
