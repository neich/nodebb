define([
  'jquery',
  'underscore',
  'backbone',
  'api',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!/templates/user/signup.html'
], function($, _, Backbone, Api, t_signup) {

  var $content = $('#content');

  var UserSignup = Backbone.View.extend({

    className: 'container',

    template: _.template(t_signup),

    initialize: function () {
    },

    events: {
      'click #btn-signup': 'submit'
    },

    submit: function() {
      var data = {
        username: this.$('[name=username]').val(),
        email: this.$('[name=email]').val(),
        password: this.$('[name=passwd]').val()
      };
      Api.signup(data)
        .then(Backbone.trigger.bind(Backbone, 'api:signup:successful'))
        .catch(Backbone.trigger.bind(Backbone, 'api:signup:error'))
    },

    render: function() {
      $content.empty();
      this.$el.html(this.template());
      this.delegateEvents();
      $content.append(this.$el);
      return this;
    }
  });

  return UserSignup;
});