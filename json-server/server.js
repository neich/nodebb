const path = require('path');

// json-server
const jsonServer = require('json-server')
const server = jsonServer.create()

// Routes
const router = jsonServer.router('db.json')
const addAuth = require('./auth')

// Middleware
const middlewares = jsonServer.defaults()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const serveStatic = require('serve-static');
const session = require('express-session')
const cors = require('cors');

const lodashId = require('lodash-id')

server.use(middlewares)
server.use(morgan('combined'))
server.use(bodyParser.json())
server.use(function (error, req, res, next) {
    error.location = "ERROR_JSON_PARSE";
    error.code = 400;
    next(error);
})
server.use(methodOverride())
server.use(cors())
server.use(session({
    secret: '63?gdº93!6dg36dºb36%Vv57V%c$%/(!V497',
    resave: true,
    saveUninitialized: true
}))
server.use(serveStatic(path.join(__dirname, '../public'), {'index': ['index.html', 'index.htm']}))

// Add id-based entities to the database
router.db._.mixin(lodashId)

addAuth(server, router)

server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})