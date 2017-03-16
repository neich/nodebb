
var Presenters = {}

var Ui = require('./ui')
var Router = require('./router')
var Login = require('./login')
var Api = require('./api')

Presenters.init = function() {
  Ui.init()
  Login.init()
  Api.init()
  Router.init()
}

module.exports = Presenters