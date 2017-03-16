var EventBus = require('../eventBus')
var localStorage = require('../localStorage')

var Router = {}

Router.init = function () {
  var AppRouter = Backbone.Router.extend({
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
      EventBus.trigger('ui:showHome')
    },

    signup: function () {
      EventBus.trigger('ui:switch:signup')
    },

    showOrders: function () {
      EventBus.trigger('ui:switch:orders')
    }
  })

  new AppRouter()

  Backbone.history.start()
}

module.exports = Router