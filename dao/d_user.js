/**
 * New node file
 */


module.exports = function (app) {
  var db = app.db;
  var User = {};

  var util = require('../util');
  var bcrypt = require('bcrypt-nodejs');

  User.checkPassword = function (username, password, t) {
    return User.getByUsername(username, t)
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

  User.getByUsername = function (username, t) {
    return db.User.find(util.addTrans(t, {where: {username: username}}));
  }

  User.getById = function (id, t) {
    return db.User.find(util.addTrans(t, {where: {id: id}}));
  }

  User.getByEmail = function (email, t) {
    return db.User.find(util.addTrans(t, {where: {email: email}}));
  }

  User.create = function (user_data, t) {
    return db.User.create(user_data, util.addTrans(t, {}));
  }

  return User;
}