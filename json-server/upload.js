const validate = require('jsonschema').validate
const util = require('../util')

module.exports = function (server, router, storage) {

    server.post('/images', function (req, res) {
        for (file in req.files.getOwnPropertyNames()) {
            storage.put(file.data).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
            });
        }
    })
}
