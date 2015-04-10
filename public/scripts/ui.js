define([
    'backbone',
    'api',
    'collections/c_orders',
    'views/user/login',
    'views/user/signup',
    'views/header',
    'views/order/vl_orders'],
  function (Backbone, Api, CollectionOrder, UserLogin, UserSignup, HeaderView, OrdersView) {

    var Ui = {};

    var loginView = new UserLogin()
    var signupView = new UserSignup()
    var headerView = new HeaderView({el: '#header'})
    var ordersView = new OrdersView();

    Ui.initialize = function () {
      headerView.setUserData(Backbone.localStorage.getItem('user'));
    };

    Ui.showHome = function () {
      loginView.render();
    };

    Ui.showSignup = function () {
      signupView.render();
    }

    Ui.showOrders = function () {
      var orders = new CollectionOrder();
      orders.fetch({
        success: ordersView.render.bind(ordersView),
        error: Ui.errorBackbone
      });
    }

    Ui.errorBackbone  = function (data, res) {
      alert("Error: " + res.responseJSON.error.message);
    }

    // This always receive a JSON object with a standard API error
    Ui.error = function (err, err2) {
      alert("Error: " + err.message);
    }

    // This always receive a jQuery error object from an API call
    Ui.errorAPI = function (res) {
      alert("Error: " + res.responseJSON.error.message);
    }

    // Event subscription

    Backbone.on('api:login:error', function (res) {
      Ui.error(res.responseJSON.error);
    });

    Backbone.on('api:signup:error', function (res) {
      Ui.error(res.responseJSON.error);
    });

    return Ui;
  });
