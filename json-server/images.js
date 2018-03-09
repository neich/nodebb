const util = require('../util')
const uuidv4 = require('uuid/v4');
const mime = require('mime-types')
const fs = require('fs');
const path = require('path')

module.exports = function (server, router) {

    server.post('/images', util.isAuthenticated, function (req, res) {
        Object.getOwnPropertyNames(req.files).forEach(function (fileName) {
            var file = req.files[fileName]
            var fname = uuidv4() + '.' + mime.extension(file.mimetype)
            file.mv('./data/' + fname , function (err) {
                if (err)
                    util.sendError(res, 500, util.Error.ERR_UNKNOWN, err)
                else {
                    router.db.get('images')
                        .insert({filename: fname, userId: req.session.userId})
                        .write()
                    util.jsonResponse(res, 'File uploaded!');
                }
            })
        })
    })

    server.get('/images/:filename', util.isAuthenticated, function(req, res) {
        var file = router.db.get('images').find(['filename', req.params.filename]).value()
        if (file)
            res.sendFile(path.resolve('./data/' + file.filename))
        else
            util.sendError(res, 400, util.Error.ERR_BAD_REQUEST, 'Image dos not exists')
    })
}

