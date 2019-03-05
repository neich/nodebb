import Backbone from 'backbone';
import _ from 'underscore';

const t_orderItem = require("raw-loader!../../../templates/order/t_orderItem.html");

const OrderItemView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderItem);
  },

  events: {
    'click li': 'detail'
  },

  render: function () {
    this.$el.html(this.template({order: this.model}));
    return this;
  },

  detail: function() {
    this.eventBus.trigger('view:order:showDetail', this.model.get('id'));
  }

});

export default OrderItemView;
