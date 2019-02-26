import Backbone from 'backbone';
import _ from 'underscore';

const tl_order = require("raw-loader!../../../templates/order/tl_order.html");

const OrderListView = Backbone.View.extend({

  initialize: function (params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_order);
  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({orders: this.collection}));
    return this;
  }

});

export default OrderListView;
