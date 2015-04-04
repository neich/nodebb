module.exports = function (app) {

  var jwt = require('express-jwt')({secret: app.secret});

  var Users = require('./routes/r_user')(app);
  var Orders = require('./routes/r_orders')(app);
  var util = require('./util');

  // User login
  app.post('/api/users/login', Users.login);
  // User registration
  app.post('/api/users', Users.create);

  // Only if User logged in
  app.get('/api/orders/:id', jwt, Orders.getById);
  // Only if User logged in
  app.get('/api/users/self/orders', jwt, Orders.getOrders, util.sendAuthError);
  // Only if User logged in
  app.post('/api/users/self/orders', jwt, Orders.create,  util.sendAuthError);

}