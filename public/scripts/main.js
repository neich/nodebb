require.config({
  paths: {
    jquery: 'libs/jquery-1.11.0.min',
    "jquery.bootstrap": "libs/bootstrap.min",
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    promises: 'libs/bluebird.min',
    text: 'libs/text'
  }
});

require([
  'promises',
  // Load our app module and pass it to our definition function
  'app'
], function (P, App) {

  // Hack !!
  P.defer = function () {
    var resolve, reject;
    var promise = new P(function () {
      resolve = arguments[0];
      reject = arguments[1];
    });
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  }

  // Add convenience JSON parse/stringigy functions to Backbone
  Backbone.localStorage = {};
  Backbone.localStorage.setItem = function (key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }
  Backbone.localStorage.getItem = function (key) {
    var str = window.localStorage.getItem(key);
    if (str) {
      return JSON.parse(str);
    }
  }

  // WARNING: this should not go in production !!!!
  window.localStorage.removeItem('user');

  // Add JWT token to each Backbone sync call
  var backboneSync = Backbone.sync;
  Backbone.sync = function (method, model, options) {
    var user = Backbone.localStorage.getItem('user');
    var token = user && user.jwt;

    if (token) {
      options.headers = {
        'Authorization': 'Bearer ' + token
      }
    }

    // call the original function
    backboneSync(method, model, options);
  };


  // The "app" dependency is passed in as "App"
  App.initialize();
});