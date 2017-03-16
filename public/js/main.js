var localStorage = require('./localStorage')
var App = require('./app')

// WARNING: this deletes any previously user
// THIS SHOULD NOT GO INTO PRODUCTION
localStorage.removeItem('user')

App.init()