var localStorage = require('../localStorage')


var Presenters = {}

var Ui = require('./ui')
var Router = require('./router')
var Login = require('./login')
var Api = require('./api')

Presenters.init = function() {
  Ui.init()
  Login.init()
  Api.init()
  Api.checkActiveSession()
    .then(function(user) {
      localStorage.setItem('user', user)
      Router.init()
    })
    .catch(function() {
      localStorage.removeItem('user')
      Router.init()
  })
    .done()
}

module.exports = Presenters