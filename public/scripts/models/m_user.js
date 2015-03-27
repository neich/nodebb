define(['backbone'],
  function(Backbone){
    var UserModel = Backbone.Model.extend({
        urlRoot: "/api/users"
    });
    // Return the model for the module
    return UserModel;
});