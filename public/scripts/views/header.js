define([
  'underscore',
  'backbone',
  'api',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!/templates/header.html'
], function(_, Backbone, Api, t_header) {

  var userData = {};

  var Header = Backbone.View.extend({

    initialize: function () {
      this.listenTo(Backbone, 'api:login:successful', this.setUserData.bind(this));
    },

    render: function() {
      this.$el.html(_.template(t_header, {user: userData}));
      // this.$el.toggleClass('completed', this.model.get('completed'));
      // this.toggleVisible();
      // this.$input = this.$('.edit');
      return this;
    },

    setUserData: function(user) {
      userData = user;
      this.render();
    }

  });
  // Our module now returns our view
  return Header;
});