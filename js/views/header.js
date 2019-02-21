var t_header = require("raw-loader!../../templates/header.html");

var userData = {}

var Header = Backbone.View.extend({

  initialize: function (params) {
    this.template = _.template(t_header)
    this.eventBus = params.eventBus

    if (params.user)
      this.setUserData(params.user)

    var view = this
    params.eventBus.on('localstorage:set:user', function(user) {
      view.setUserData(user)
      view.render()
    })
  },

  events: {
    'click .glyphicon-log-out' : 'logout'
  },

  render: function () {
    this.$el.html(this.template({user: userData}))
    return this
  },

  setUserData: function (user) {
    userData = user
  },

  logout: function() {
    this.eventBus.trigger('view:logout:request')
  }

})

module.exports = Header