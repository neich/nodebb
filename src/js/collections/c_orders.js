import Backbone from 'backbone';
import OrderModel from '~/models/m_order';

const OrderCollection = Backbone.Collection.extend({
  model: OrderModel,
  url: "/api/orders"
});

export default OrderCollection;
