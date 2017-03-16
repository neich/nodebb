var EventBus = require('../eventBus')
var localStorage = require('../localStorage')
var CollectionOrder = require("../collections/c_orders")
var UserLogin = require("../views/user/v_login")
var UserSignup = require("../views/user/v_signup")
var HeaderView = require("../views/header")
var OrdersView = require("../views/order/vl_orders")

var Ui = {}

// Views that can be rendered at #content
var loginView = new UserLogin({eventBus: EventBus})
var signupView = new UserSignup({eventBus: EventBus})

var orderList = new CollectionOrder({eventBus: EventBus})
var ordersView = new OrdersView({collection: orderList, eventBus: EventBus})

var $content = $('#content')

var headerView = new HeaderView({el: '#header', eventBus: EventBus})

Ui.switchContent = function (widget) {

  var args = Array.prototype.slice.call(arguments)
  args.shift()
  switch (widget) {
    case 'login': {
      $content.html(loginView.render.apply(loginView, args).el)
      loginView.delegateEvents()
      break
    }
    case 'signup': {
      $content.html(signupView.render.apply(signupView, args).el)
      signupView.delegateEvents()
      break
    }
    case 'orders': {
      orderList.fetch({
        success: function () {
          $content.html(ordersView.render.apply(ordersView, args).el)
          ordersView.delegateEvents()
        },
        error: Ui.error
      });
      break
    }
  }
}

Ui.init = function () {
  headerView.setUserData(localStorage.getItem('user'))
  Ui.showHome();
}

Ui.showHome = function () {
  if (localStorage.hasItem('user')) {
    Ui.switchContent('orders')
  } else {
    Ui.switchContent('login')
  }
}

Ui.showSignup = function () {
  Ui.switchContent('signup')
}

Ui.showOrders = function () {
  orderList.fetch({
    success: Ui.switchContent.bind(Ui, 'orders'),
    error: Ui.error
  });
}

// This always receive a JSON object with a standard API error
Ui.error = function (err) {
  if (err.message)
    alert("Error: " + err.message)
  else if (err.responseJSON) {
    if (err.responseJSON.message)
      alert("Error: " + err.responseJSON.message)
    else if (err.responseJSON.error)
      alert("Error: " + err.responseJSON.error.message)
  }
}

EventBus.on('ui:showHome', Ui.showHome)
EventBus.on('ui:showError', Ui.error)
EventBus.on('ui:switch:signup', Ui.showSignup)
EventBus.on('ui:switch:orders', Ui.showOrders)


module.exports = Ui