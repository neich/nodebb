/**
 * New node file
 */


/*
 * GET users listing.
 */

module.exports = function (app) {

  var db = app.db;
  var secret = app.secret;
  var P = app.Promise;

  var util = require('../util');
  var dao = require('../dao')(app);
  var bcrypt = require('bcrypt-nodejs');

  return {
    login: function (req, res) {
      util.checkParams(req.body, ['username', 'password']);

      dao.User.checkPassword(req.body.username, req.body.password)
        .then(function (user) {
          req.session.userId = user.id
          req.session.username = user.username
          util.jsonResponse(res, {userId: user.id, username: user.username});
        })
        .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
        .done();
    },

    logout: function (req, res) {
      if (!req.session.userId) util.sendError(res, 400, util.Error.ERR_AUTHENTICATION, 'Not logged in!')
      delete req.session.userId
      delete req.session.username
      util.jsonResponse(res, {})
    },

    create: function (req, res) {
      util.checkParams(req.body, ['email', 'username', 'password']);

      var attribs = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
      }

      db.sequelize.transaction(function (t) {
        return Promise.all([
          dao.User.getByEmail(req.body.email, t),
          dao.User.getByUsername(req.body.username, t)
        ])
          .then(([s1, s2]) => {
            if (!s1 && !s2) {
              return dao.User.create(attribs, t);
            } else if (s1) {
              util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, "Already exist a User with email = " + req.body.email);
            } else {
              util.throwError(400, util.Error.ERR_ENTITY_EXISTS, "Already exist a User with username = " + req.body.username);
            }
          })
      }).then(util.jsonResponse.bind(util, res))
        .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
        .done();
    },

    check: function (req, res) {
      if (req.session.userId) util.jsonResponse(res, {userId: req.session.userId, username: req.session.username})
      else util.sendError(res, 400, util.Error.ERR_AUTHENTICATION, 'User has not signed up')
    }
  }
}
