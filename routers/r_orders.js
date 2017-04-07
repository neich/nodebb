module.exports = function(app) {

  var express = require('express')

  var Orders = require('../controllers/c_orders')(app)
  var util = require('../util')

  var router = express.Router()

  router.get('/api/orders/:id', util.isAuthenticated, Orders.getById)
  router.get('/api/users/self/orders', util.isAuthenticated, Orders.getOrders)
  router.post('/api/orders', util.isAuthenticated, Orders.create)

  return router
}