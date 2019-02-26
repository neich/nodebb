import Backbone from 'backbone';
import EventBus from '~/eventBus';

const Router = {};

Router.init = function () {
  const AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'home',
      'signup': 'signup',
      'login': 'home',
      'orders': 'showOrders',

      // Default
      '*actions': 'defaultAction'
    },

    home: function () {
      EventBus.trigger('ui:showHome');
    },

    signup: function () {
      EventBus.trigger('ui:switch:signup');
    },

    showOrders: function () {
      EventBus.trigger('ui:switch:orders');
    }
  });

  new AppRouter();

  Backbone.history.start();
};

export default Router;
