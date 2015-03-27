define([
  'jquery',
  'underscore',
  'backbone',
  'api',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!/templates/user/login.html'
], function($, _, Backbone, Api, t_login) {

  var $content = $('#content');

  var UserLogin = Backbone.View.extend({

    template: _.template(t_login),

    className: 'container',

    initialize: function () {
    },

    events: {
      'click #btn-login': 'submit'
    },

    submit: function() {
      var data = {username: this.$('#login-username').val(), password: this.$('#login-password').val()};
      Api.login(data)
        .then(Backbone.trigger.bind(Backbone, 'api:login:successful'))
        .catch(Backbone.trigger.bind(Backbone, 'api:login:error', data))
    },

    render: function() {
      $content.empty();
      this.$el.html(this.template());
      this.delegateEvents();
      $content.append(this.$el);
      return this;
    }

  });
  // Our module now returns our view
  return UserLogin;
});