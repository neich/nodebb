var t_header = require("raw-loader!../../templates/header.html");

var userData = {}

var Header = Backbone.View.extend({

  initialize: function (params) {
    this.template = _.template(t_header)
    if (params.user)
      this.setUserData(params.user)

    var view = this
    params.eventBus.on('localstorage:set:user', function(user) {
      view.setUserData(user)
      view.render()
    })
  },

  render: function () {
    this.$el.html(this.template({user: userData}))
    return this
  },

  setUserData: function (user) {
    userData = user
  }

})

module.exports = Header