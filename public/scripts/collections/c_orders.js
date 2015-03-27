define([
    'backbone',
    'models/m_order'
], function(Backbone, OrderModel){
    var OrderCollection = Backbone.Collection.extend({
        model: OrderModel,
        url: "/api/users/self/orders"
    });

    return OrderCollection;
});