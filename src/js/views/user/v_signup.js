import Backbone from 'backbone';
import _ from 'underscore';

const t_signup = require("raw-loader!../../../templates/user/signup.html");


const UserSignup = Backbone.View.extend({

  className: 'container',

  template: _.template(t_signup),

  initialize: function (params) {
    this.eventBus = params.eventBus;
  },

  events: {
    'click .btn-primary': 'submit'
  },

  submit: function () {
    const data = {
      username: this.$('[name=username]').val(),
      email: this.$('[name=email]').val(),
      password: this.$('[name=password]').val()
    };
    this.eventBus.trigger('view:signup:request', data);
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

export default UserSignup;
