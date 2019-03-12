import Backbone from 'backbone';
import _ from 'underscore';
import Order from '~/models/m_order';
import LocalStorage from '~/localStorage';

const t_orderCreate = require("raw-loader!../../../templates/order/t_orderCreate.html");

const OrderCreateView = Backbone.View.extend({

    initialize: function (params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_orderCreate);
    },

    events: {
        'click .remove-icon': 'hide',
        'click #button-create' : 'createOrder'
    },

    render: function () {
        this.$el.html(this.template({order: this.model}));
        return this;
    },

    hide: function () {
        this.eventBus.trigger('view:orderCreate:hide');
    },

    createOrder: function() {
        const data = {
            description: this.$el.find('[name="description"]').val(),
            userId: LocalStorage.getItem('user').id
        };
        const eventBus = this.eventBus;
        const order = new Order();
        order.save(data, {
            success: function(order) {
                eventBus.trigger('view:orderCreate:created', order);
            }
        });
    }

});

export default OrderCreateView;
