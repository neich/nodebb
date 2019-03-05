import Backbone from 'backbone';
import _ from 'underscore';

const t_orderDetail = require("raw-loader!../../../templates/order/t_orderDetail.html");

const OrderDetailView = Backbone.View.extend({

    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_orderDetail);
    },

    render: function () {
        this.$el.html(this.template({order: this.model}));
        return this;
    }

});

export default OrderDetailView;
