const path = require('path')

// json-server
const jsonServer = require('json-server')
const server = jsonServer.create()

// Firebase
var firebase = require("firebase/app")
require("firebase/storage")

var config = {
    apiKey: "AIzaSyBMYhMIMNHY3wgT9K2TZTYScTaTqLIm83o",
    authDomain: "nodebb-edb15.firebaseapp.com",
    databaseURL: "https://nodebb-edb15.firebaseio.com",
    projectId: "nodebb-edb15",
    storageBucket: "",
    messagingSenderId: "626231727792"
}
firebase.initializeApp(config)

// Routes
const router = jsonServer.router('db.json')
const addAuth = require('./auth')
const addFileUpload = require('./upload')

// Middleware
const middlewares = jsonServer.defaults()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const serveStatic = require('serve-static')
const session = require('express-session')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const lodashId = require('lodash-id')

server.use(middlewares)
server.use(morgan('combined'))
server.use(bodyParser.json())
server.use(function (error, req, res, next) {
    error.location = "ERROR_JSON_PARSE"
    error.code = 400
    next(error)
})
server.use(methodOverride())
server.use(cors())
server.use(session({
    secret: '63?gdº93!6dg36dºb36%Vv57V%c$%/(!V497',
    resave: true,
    saveUninitialized: true
}))
server.use(fileUpload())
server.use(serveStatic(path.join(__dirname, '../public'), {'index': ['index.html', 'index.htm']}))

// Add id-based entities to the database
router.db._.mixin(lodashId)

addAuth(server, router)
addFileUpload(server, router, firebase.storage().ref())

server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})