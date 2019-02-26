import Backbone from 'backbone';
import _ from 'underscore';

const t_login = require("raw-loader!../../../templates/user/login.html");


const UserLogin = Backbone.View.extend({

  initialize: function (params) {
    this.eventBus = params.eventBus;
  },

  template: _.template(t_login),

  className: 'container',

  events: {
    'click .btn': 'submit'
  },

  submit: function () {
    this.eventBus.trigger('view:login:request', this.$('#inputUsername').val(), this.$('#inputPassword').val());
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }

});

export default UserLogin;
