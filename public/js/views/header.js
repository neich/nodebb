var t_header = require("raw-loader!../../templates/header.html");

var userData = {}

var Header = Backbone.View.extend({

  initialize: function (params) {
    this.template = _.template(t_header)
    params.eventBus.on('localstorage:set:user', this.setUserData.bind(this))
  },

  render: function () {
    this.$el.html(this.template({user: userData}))
    return this
  },

  setUserData: function (user) {
    userData = user
    this.render()
  }

})

module.exports = Header