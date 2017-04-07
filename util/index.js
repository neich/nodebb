var util = {}

util.jsonResponse = function (res, obj) {
  res.status(200).json(obj || {message: 'ok'});
};

util.throwError = function (code, type, reason, prevErr) {
  console.log("Throwing error ...");
  var err =  prevErr ? new Error(reason + ' (' + prevErr.message + ')') : new Error(reason);
  err.type = type;
  err.code = code;
  throw err;
}

util.sendError = function (res, code, type, err) {
  var json = {};
  json.type = type || error.ERR_UNKNOWN;
  json.message = err.message || err || "Unknown error";
  res.status(code || 500).json({ error: json });
}

util.addTrans = function (t, obj) {
  if (!t) return obj;
  else {
    obj.transaction = t;
    return obj;
  }
}

util.checkParams = function (obj, params) {
  if (!obj) exports.throwError(400, error.ERR_BAD_REQUEST, "No body found in request");
  for (var i = 0; i < params.length; i++) {
    if (!obj.hasOwnProperty(params[i])) {
      exports.throwError(400, error.ERR_MISSING_PARAMETER, "Missing parameter (" + params[i] + ") in request");
    }
  }
}

var error = {
  ERR_MISSING_PARAMETER: 'ERR_MISSING_PARAMETER',
  ERR_AUTHENTICATION: 'ERR_AUTHENTICATION',
  ERR_ENTITY_NOT_FOUND: 'ERR_ENTITY_NOT_FOUND',
  ERR_ENTITY_EXISTS: 'ERR_ENTITY_EXISTS',
  ERR_TRANSACTION: 'ERR_DB_TRANSACTION',
  ERR_UNKNOWN: 'ERR_UNKNOWN',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'

}

util.Error = error;


util.isAuthenticated = function(req, res, next) {
  if (req.session.userId) next()
  else util.sendError(res, 400, error.ERR_AUTHENTICATION, 'No user is authenticated')
}

util.istNotAuthenticated = function(req, res, next) {
  if (req.session.userId) util.sendError(400, error.ERR_AUTHENTICATION, 'User is already authenticated')
  else next()
}

module.exports = util

