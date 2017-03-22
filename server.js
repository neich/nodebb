var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var session = require('express-session')
var bcrypt = require('bcrypt-nodejs');

var app = express();

// Application configuration

app.set('port', process.env.PORT || 3000)

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(function (error, req, res, next) {
  error.location = "ERROR_JSON_PARSE";
  error.code = 400;
  next(error);
})
app.use(methodOverride());
app.use(cors());
app.use(session({
  secret: '63?gdº93!6dg36dºb36%Vv57V%c$%/(!V497',
  resave: true,
  saveUninitialized: true
}))

app.use(serveStatic(path.join(__dirname, 'public'), {'index': ['index.html', 'index.htm']}));

app.use(function (err, req, res, next) {
  var code = err.code || 500;
  var json = {};
  json.type = err.type || "ERROR_UNKNOWN";
  json.name = err.name || "UNKNOWN";
  json.message = err.message || "Unknown error";
  json.stack = err.stack || "No stack trace available";
  res.status(code).send({
    error: json
  });
});


// Database initialization

app.db = require('./models')

app.db.init(app.get('env'))
  .then(function() {
    return app.db.User.create({username: 'jo', password: bcrypt.hashSync('jo'), email: 'jo@jo.com'})
  })
  .then(function(user) {
    return app.db.Order.create({description: 'My first order'})
      .then(function(order) {
        return order.setUser(user)
      });
  })
  .then(function () {
    app.use(require('./routers/noAuthRouter')(app));
    app.use(require('./routers/authRouter')(app));

    var port = process.env.OPENSHIFT_NODEJS_PORT || app.get('port');
    var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

    http.createServer(app).listen(port, ip, function () {
      console.log("Express server listening on " + ip + ":" + port);
    })

  })
  .catch(function (err) {
    console.log("Error initializing database: " + err);
  })
  .done();
