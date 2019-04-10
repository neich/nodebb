import Backbone from 'backbone';
import _ from 'underscore';

const t_header = require("raw-loader!../../templates/header.html");

let userData = {};

const Header = Backbone.View.extend({

  initialize: function (params) {
    this.template = _.template(t_header);
    this.eventBus = params.eventBus;

    this.setUserData(params.user);

    const view = this;
    params.eventBus.on('localstorage:set:user', function(user) {
      view.setUserData(user);
      view.render();
    });
  },

  events: {
    'click .logout' : 'logout'
  },

  render: function () {
    this.$el.html(this.template({user: userData}));
    return this;
  },

  setUserData: function (user) {
    userData = user;
  },

  logout: function() {
    this.eventBus.trigger('view:logout:request');
  }

});

export default Header;
