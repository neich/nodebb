var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');

var secret = '63?gdº93!6dg36dºb36%Vv57V%c$%/(!V497';

var app = express();

app.set('port', process.env.PORT || 3000)

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(function (error, req, res, next) {
  error.location = "ERROR_JSON_PARSE";
  error.code = 400;
  next(error);
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride());
app.use(cors());
app.use(serveStatic(path.join(__dirname, 'public'), {'index': ['index.html', 'index.htm']}));
app.use(function (err, req, res, next) {
  var code = err.code || 500;
  var json = {};
  json.type = err.type || "ERROR_UNKNOWN";
  json.name = err.name || "UNKNOWN";
  json.message = err.message || "Unknown error";
  json.stack = err.stack || "No stack trace available";
  res.status(500).send({
    error: json
  });
});

app.secret = secret;
// app.Promise = require('when');
app.Promise = require('bluebird');
app.Promise.defer =  function () {
  var resolve, reject;
  var promise = new app.Promise(function() {
    resolve = arguments[0];
    reject = arguments[1];
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
}

var db = require('./models')(app);

app.db = db;

db.initPromise
  .then(function () {

    var rest = require('./rest.js')(app);

    var port = process.env.OPENSHIFT_NODEJS_PORT || app.get('port');
    var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

    http.createServer(app).listen(port, ip, function () {
      console.log("Express server listening on " + ip + ":" + port);
    })

  }, function (err) {
    console.log("Error initializing database: " + err);
  })
  .done();
