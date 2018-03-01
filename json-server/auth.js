const validate = require('jsonschema').validate
const util = require('../util')

var userSchemaLogin = {
    properties: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        }
    }
}

var userSchemaRegister = {
    properties: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        }
    }
}


module.exports = function (server, router) {

    function addAuthorization(server, entity) {

        function authMiddleware_GET_PUT_DELETE(req, res, next) {
            if (!req.session.userId)
                util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'No authenticated user')
            else {
                var obj = router.db.get(entity).find(['id', parseInt(req.params.id)]).value()
                if (!obj)
                    util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'Object does not exists')
                else if (obj.userId !== req.session.userId)
                    util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'You don\'t have permissions to acces this object')
                else
                    next()
            }
        }

        function authMiddleware_POST(req, res, next) {
            if (!req.session.userId)
                util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'No authenticated user')
            else {
                req.body.userId = req.session.userId
                next()
            }
        }

        server.get('/' + entity + '/:id', authMiddleware_GET_PUT_DELETE);
        server.put('/' + entity + '/:id', authMiddleware_GET_PUT_DELETE);
        server.delete('/' + entity + '/:id', authMiddleware_GET_PUT_DELETE);
        server.post('/' + entity, authMiddleware_POST)
    }

    // Call this function for each entity that has ownership wrt users
    addAuthorization(server, 'orders')

    server.post('/users/login', function (req, res) {
        var v = validate(req.body, userSchemaLogin)

        if (!v.valid)
            util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, util.jsonSchemaError(v))
        else {
            var user = router.db.get('users').find(['username', req.body.username]).value()
            if (user) {
                if (user.id === req.session.userId)
                    util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'User already authenticated')
                else if (user.password === req.body.password) {
                    req.session.userId = user.id
                    req.session.username = user.username
                    util.jsonResponse(res, user)
                } else
                    util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'Password do not match')
            } else
                util.jsonResponse(res, 'User <' + req.body.username + '> does not exists')
        }
    })

    server.post('/users/logout', function (req, res) {
        if (!req.session.userId)
            util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'No authenticated user')
        else {
            delete req.session['userId']
            delete req.session['username']
            util.jsonResponse(res, 'User logged out successfully')
        }
    })

    server.post('/users', function (req, res) {
        if (req.session.userId)
            util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'You are already logged in')
        else {
            var v = validate(req.body, userSchemaRegister)
            if (!v.valid)
                util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, util.jsonSchemaError(v))
            else {
                router.db
                    .get('users')
                    .insert({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    })
                    .write()
                util.jsonResponse(res, 'User created successfully')
            }
        }
    })

}
