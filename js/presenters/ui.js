var EventBus = require('../eventBus')
var localStorage = require('../localStorage')
var CollectionOrder = require("../collections/c_orders")
var UserLogin = require("../views/user/v_login")
var UserSignup = require("../views/user/v_signup")
var HeaderView = require("../views/header")
var OrdersView = require("../views/order/vl_orders")

var Ui = {}

var orderList = new CollectionOrder({eventBus: EventBus})

var $content = $('#content')

var lastHeader = null
var lastContent = null

Ui.switchContent = function (widget) {
  if (lastContent) lastContent.undelegateEvents()

  var args = Array.prototype.slice.call(arguments)
  args.shift()
  switch (widget) {
    case 'login': {
      lastContent = new UserLogin({el: $content, eventBus: EventBus}).render()
      break
    }
    case 'signup': {
      lastContent = new UserSignup({el: $content, eventBus: EventBus}).render()
      break
    }
    case 'orders': {
      if (localStorage.hasItem('user')) {
        orderList.fetch({
          success: function () {
            lastContent = new OrdersView({el: $content, eventBus: EventBus, collection: orderList}).render()
          },
          error: Ui.error
        });
      } else
        Ui.switchContent('login')
      break
    }
  }
}

Ui.init = function () {
  // headerView.setUserData(localStorage.getItem('user'))
  // Ui.showHome();
}

Ui.showHome = function () {
  if (lastHeader) lastHeader.undelegateEvents()
  lastHeader = new HeaderView({el: '#header', eventBus: EventBus, user: localStorage.getItem('user')}).render()
  if (localStorage.hasItem('user')) {
    Ui.switchContent('orders')
  } else {
    Ui.switchContent('login')
  }
}

Ui.showSignup = function () {
  Ui.switchContent('signup')
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
EventBus.on('ui:switch:orders', Ui.switchContent.bind(null, 'orders'))

module.exports = Ui

