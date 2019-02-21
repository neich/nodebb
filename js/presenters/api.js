var localStorage = require('../localStorage')
var EventBus = require('../eventBus')

var Api = {};

Api.login = function (data) {
  return $.ajax({
    url: '/api/users/login',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(data),
    processData: false,
  })
};

Api.logout = function (data) {
  return $.ajax({
    url: '/api/users/logout',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    processData: false,
  })
};

Api.signup = function (data) {
  return $.ajax({
    url: '/api/users',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(data),
    processData: false,
  });
};

Api.checkActiveSession = function() {
  return $.getJSON('/api/users/self')
}

Api.init = function () {

// Login

  EventBus.on('api:login', function (username, password) {
    Api.login({username: username, password: password})
      .then(EventBus.trigger.bind(EventBus, 'api:login:successful'))
      .catch(EventBus.trigger.bind(EventBus, 'api:login:error'))
      .done()
  })

  EventBus.on('api:login:successful', function (user) {
    localStorage.setItem('user', user);
    EventBus.trigger('ui:showHome')
  })

  EventBus.on('api:login:error', EventBus.trigger.bind(EventBus, 'ui:showError'))

// Logout

  EventBus.on('api:logout', function () {
    Api.logout()
      .then(EventBus.trigger.bind(EventBus, 'api:logout:successful'))
      .catch(EventBus.trigger.bind(EventBus, 'api:logout:error'))
      .done()
  })

  EventBus.on('api:logout:successful', function () {
    localStorage.removeItem('user');
    EventBus.trigger('ui:showHome')
  })

  EventBus.on('api:logout:error', EventBus.trigger.bind(EventBus, 'ui:showError'))

// Signup

  EventBus.on('api:signup', function (data) {
    Api.signup(data)
      .then(EventBus.trigger.bind(EventBus, 'api:signup:successful'))
      .catch(EventBus.trigger.bind(EventBus, 'api:signup:error'))
      .done()
  })

  EventBus.on('api:signup:successful', function (user) {
    EventBus.trigger('ui:showHome')
  })

  EventBus.on('api:signup:error', EventBus.trigger.bind(EventBus, 'ui:showError'))
}

module.exports = Api