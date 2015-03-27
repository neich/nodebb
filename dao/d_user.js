/**
 * New node file
 */


module.exports = function (app) {
  var db = app.db;
  var dao = {};

  var util = require('../util');
  var bcrypt = require('bcrypt-nodejs');

  dao.checkPassword = function (username, password, t) {
    return dao.getByUsername(username, t)
      .then(function (user) {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            util.throwError(400, util.Error.ERR_AUTHENTICATION, "Invalid password");
          }
        } else {
          util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, "There is no User with username: " + username);
        }
      });
  };

  dao.getByUsername = function (username, t) {
    return db.User.find(util.addTrans(t, {where: {username: username}}));
  }

  dao.getByEmail = function (email, t) {
    return db.User.find(util.addTrans(t, {where: {email: email}}));
  }

  dao.create = function (user_data, t) {
    return db.User.create(user_data, util.addTrans(t, {}));
  }

  return dao;
}