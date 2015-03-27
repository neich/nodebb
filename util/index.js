exports.jsonResponse = function (res, obj) {
  res.status(200).json(obj || {message: 'ok'});
};

exports.throwError = function (code, type, reason, prevErr) {
  console.log("Throwing error ...");
  var err =  prevErr ? new Error(reason + ' (' + prevErr.message + ')') : new Error(reason);
  err.type = type;
  err.code = code;
  throw err;
}

exports.resendError = function (res, err) {
  var code = err.code || 500;
  var stack = err.stack;
  var json = {};
  json.type = err.type || "ERROR_UNKNOWN";
  json.name = err.name || "UNKNOWN";
  json.message = err.message || "Unknown error";
  res.status(code).json({
    error: json
  });
}

exports.sendError = function (res, code, type, reason) {
  var json = {};
  json.type = type || "ERROR_UNKNOWN";
  json.message = reason || "Unknown error";
  res.status(code || 500).json({ error: json });
}

exports.addTrans = function (t, obj) {
  if (!t) return obj;
  else {
    obj.transaction = t;
    return obj;
  }
}

exports.checkParams = function (obj, params) {
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
  ERR_TRANSACTION: 'ERR_DB_TRANSACTION'
}

exports.Error = error;

