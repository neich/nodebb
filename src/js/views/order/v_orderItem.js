import Backbone from 'backbone';
import _ from 'underscore';

const tl_orderItem = require("raw-loader!../../../templates/order/tl_orderItem.html");

const OrderItemView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_orderItem);
  },

  render: function () {
    this.$el.html(this.template({o: this.model}));
    return this;
  }

});

export default OrderItemView;
