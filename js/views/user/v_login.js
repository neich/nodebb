var t_login = require("raw-loader!../../../templates/user/login.html")


var UserLogin = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
  },

  template: _.template(t_login),

  className: 'container',

  events: {
    'click .btn-login': 'submit'
  },

  submit: function () {
    this.eventBus.trigger('view:login:request', this.$('#login-username').val(), this.$('#login-password').val())
  },

  render: function () {
    this.$el.html(this.template())
    return this
  }

})

module.exports = UserLogin