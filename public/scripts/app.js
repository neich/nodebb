define(['backbone', 'api', 'router', 'ui'], function (Backbone, Api, Router, Ui) {
  var App = {};

  App.initialize = function () {
    Ui.initialize();
  };

  return App;
});
