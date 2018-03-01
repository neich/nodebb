const validate = require('jsonschema').validate
const util = require('../util')

module.exports = function (server, router) {
    server.post('/users/login', function (req, res) {
        var v = validate(req.body, {
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
        })

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

    server.get('/orders', function (req, res, next) {
        if (!req.session.userId)
            res.sendError(res, 400, util.Error.ERR_AUTHENTICATION, 'This resource requires authentication')
        else {
            req
        }
    })

}
