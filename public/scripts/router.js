define([
  'backbone',
  'ui'
], function (Backbone, Ui) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'home',
      'signup': 'signup',
      'orders': 'showOrders',

      // Default
      '*actions': 'defaultAction'
    },

    home: function() {
      Ui.showHome();
    },

    signup: function() {
      Ui.showSignup();
    },

    showOrders: function() {
      Ui.showOrders();
    }
  });

  var app = new AppRouter();

  Backbone.history.start();

  Backbone.on('api:signup:successful', function (user) {
    app.navigate('', { trigger: true });
  });

  Backbone.on('api:login:successful', function (user) {
    localStorage.setItem('user', user);
    app.navigate('orders', { trigger: true });
  });

  return app;

});