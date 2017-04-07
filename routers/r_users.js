module.exports = function (app) {

  var express = require('express')
  var Users = require('../controllers/c_user')(app)
  var util = require('../util')

  var router = express.Router()

  // User login
  router.post('/api/users/login', util.istNotAuthenticated, Users.login)
  // User registration
  router.post('/api/users', util.istNotAuthenticated, Users.create)
  // Check if user is logged in
  router.get('/api/users/self', util.isAuthenticated, Users.check)

  return router;
}