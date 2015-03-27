/**
 * New node file
 */

module.exports = function (app) {
  var dao = {};

  dao.User = require('./d_user')(app);
  dao.Order = require('./d_order')(app);

  return dao;
}