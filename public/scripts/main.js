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
  P.defer =  function () {
    var resolve, reject;
    var promise = new P(function() {
      resolve = arguments[0];
      reject = arguments[1];
    });
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  }

  // The "app" dependency is passed in as "App"
  App.initialize();
});