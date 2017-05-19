module.exports = function (app) {

  var express = require('express')

  var Users = require('../controllers/c_user')(app)
  var Orders = require('../controllers/c_orders')(app)

  var util = require('../util')

  // Mounted on /api/users
  var router = express.Router()

  // User login
  router.post('/login', util.isNotAuthenticated, Users.login)
  router.post('/logout', util.isAuthenticated, Users.logout)
  // User registration
  router.post('/', util.isNotAuthenticated, Users.create)
  // Check if user is logged in
  router.get('/self', util.isAuthenticated, Users.check)
  // Get all ordeers belonging to the signed in user
  router.get('/self/orders', util.isAuthenticated, Orders.getOrders)

  return router;
}