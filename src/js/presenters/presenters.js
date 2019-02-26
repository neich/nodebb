import LocalStorage from '~/localStorage';
import Ui from '~/presenters/ui';
import Router from '~/presenters/router';
import Login from '~/presenters/login';
import Api from '~/presenters/api';

const Presenters = {};

Presenters.init = function () {
    Ui.init();
    Login.init();
    Api.init();
    Api.checkActiveSession()
        .then(function (user) {
            LocalStorage.setItem('user', user);
            Router.init();
        })
        .catch(function () {
            LocalStorage.removeItem('user');
            Router.init();
        })
        .done();
};

export default Presenters;
