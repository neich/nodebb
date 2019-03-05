import Backbone from 'backbone';
import _ from 'underscore';
import OrderItemView from '~/views/order/v_orderItem';
import OrderDetailView from '~/views/order/v_orderDetail';

const tl_order = require("raw-loader!../../../templates/order/tl_order.html");

const OrderListView = Backbone.View.extend({

  initialize: function (params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_order);

    this.localEventBus = _.extend({}, Backbone.Events);
    this.localEventBus.on('view:order:detail', this.detail.bind(this));

  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({orders: this.collection}));
    const $orderList = this.$el.find('.list-group');
    const eb = this.localEventBus;
    this.collection.each(function(order) {
      $orderList.append(new OrderItemView({model: order, eventBus: eb}).render().el);
    });

    return this;
  },

  detail: function(id) {
    this.$el.find('.order-list').addClass('col-md-9').removeClass('col-md-12');
    const $orderDetail = this.$el.find('.order-detail');
    new OrderDetailView({el: $orderDetail, model: this.collection.get(id)}).render();
    $orderDetail.show();
  }

});

export default OrderListView;
