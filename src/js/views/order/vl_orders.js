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
    this.localEventBus.on('view:order:showDetail', this.showDetail.bind(this));
    this.localEventBus.on('view:order:hideDetail', this.hideDetail.bind(this));

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

  showDetail: function(id) {
    this.$el.find('.order-list').addClass('col-md-9').removeClass('col-md-12');
    const $orderDetail = this.$el.find('.order-detail');
    new OrderDetailView({
      el: $orderDetail,
      model: this.collection.get(id),
      eventBus: this.localEventBus
    }).render();
    $orderDetail.show();
  },

  hideDetail: function() {
    this.$el.find('.order-detail').hide();
    this.$el.find('.order-list').addClass('col-md-12').removeClass('col-md-9');
  }

});

export default OrderListView;
