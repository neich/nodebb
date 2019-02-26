import EventBus from '~/eventBus';


const Login = {};

Login.init = function () {

  EventBus.on('view:login:request', EventBus.trigger.bind(EventBus, 'api:login'));
  EventBus.on('view:signup:request', EventBus.trigger.bind(EventBus, 'api:signup'));
  EventBus.on('view:logout:request', EventBus.trigger.bind(EventBus, 'api:logout'));

};

export default Login;
