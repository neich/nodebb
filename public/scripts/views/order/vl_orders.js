define([
  'jquery',
  'underscore',
  'backbone',
  'api',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!/templates/order/tl_order.html'
], function($, _, Backbone, Api, tl_order) {

  var $content = $('#content');

  var OrderListView = Backbone.View.extend({

    template: _.template(tl_order),

    className: 'container',

    initialize: function () {
    },

    render: function() {
      $content.empty();
      this.$el.html(this.template());
      this.delegateEvents();
      $content.append(this.$el);
      return this;
    }

  });

  return OrderListView;
});