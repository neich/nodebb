var Presenter = require('./presenters')

var App = { Presenter }

App.init = function() {
  this.Presenter.init()
}

module.exports = App
