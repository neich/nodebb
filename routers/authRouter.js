module.exports = function(app) {

  var express = require('express')

  var Orders = require('../controllers/c_orders')(app)
  var util = require('../util')

  var router = express.Router()

  router.get('/api/orders/:id', Orders.getById)
  router.get('/api/users/self/orders', Orders.getOrders, util.sendAuthError)
  router.post('/api/users/self/orders', Orders.create, util.sendAuthError)

  return router
}