var t_signup = require("raw-loader!../../../templates/user/signup.html")


var UserSignup = Backbone.View.extend({

  className: 'container',

  template: _.template(t_signup),

  initialize: function(params) {
    this.eventBus = params.eventBus;
  },

  events: {
    'click #btn-signup': 'submit'
  },

  submit: function () {
    var data = {
      username: this.$('[name=username]').val(),
      email: this.$('[name=email]').val(),
      password: this.$('[name=passwd]').val()
    }
    this.eventBus.trigger('view:signup:request', data)
  },

  render: function () {
    this.$el.html(this.template())
    return this
  }
})

module.exports = UserSignup