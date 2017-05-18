var EventBus = require('../eventBus')


var Login = {}

Login.init = function () {

  EventBus.on('view:login:request', EventBus.trigger.bind(EventBus, 'api:login'));

  EventBus.on('view:signup:request', EventBus.trigger.bind(EventBus, 'api:signup'));

  EventBus.on('view:logout:request', EventBus.trigger.bind(EventBus, 'api:logout'))

}

module.exports = Login