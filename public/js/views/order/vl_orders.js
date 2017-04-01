var tl_order = require("raw-loader!../../../templates/order/tl_order.html")

var OrderListView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_order);
  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({orders: this.collection}))
    return this
  }

});

module.exports = OrderListView
