define(['backbone'],
  function(Backbone){
    var OrderModel = Backbone.Model.extend({
      urlRoot: "/api/orders"
    });
    // Return the model for the module
    return OrderModel;
  });