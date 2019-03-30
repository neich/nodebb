import LocalStorage from '~/localStorage';
import EventBus from '~/eventBus';
import CollectionOrder from '~/collections/c_orders';
import UserLogin from '~/views/user/v_login';
import UserSignup from '~/views/user/v_signup';
import HeaderView from '~/views/header';
import OrdersView from '~/views/order/vl_orders';

const Ui = {};

const orderList = new CollectionOrder();

const $content = $('#content');

let lastHeader = null;
let lastContent = null;

Ui.switchContent = function (widget) {
    if (lastContent) lastContent.undelegateEvents();

    const args = Array.prototype.slice.call(arguments);
    args.shift();
    switch (widget) {
        case 'login': {
            lastContent = new UserLogin({el: $content, eventBus: EventBus}).render();
            break;
        }
        case 'signup': {
            lastContent = new UserSignup({el: $content, eventBus: EventBus}).render();
            break;
        }
        case 'orders': {
            if (LocalStorage.hasItem('user')) {
                orderList.fetch({
                    success: function () {
                        lastContent = new OrdersView({
                            el: $content,
                            eventBus: EventBus,
                            collection: orderList
                        }).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
    }
};

Ui.init = () => {};

Ui.showHome = function () {
    if (lastHeader) lastHeader.undelegateEvents();
    lastHeader = new HeaderView({el: '#header', eventBus: EventBus, user: LocalStorage.getItem('user')}).render();
    if (LocalStorage.hasItem('user')) {
        Ui.switchContent('orders');
    } else {
        Ui.switchContent('login');
    }
};

Ui.showSignup = function () {
    Ui.switchContent('signup');
};

// This always receive a JSON object with a standard API error
Ui.error = function (err) {
    if (err.message)
        alert("Error: " + err.message);
    else if (err.responseJSON) {
        if (err.responseJSON.message)
            alert("Error: " + err.responseJSON.message);
        else if (err.responseJSON.error)
            alert("Error: " + err.responseJSON.error.message);
    }
};

EventBus.on('ui:showHome', Ui.showHome);
EventBus.on('ui:showError', Ui.error);
EventBus.on('ui:switch:signup', Ui.showSignup);
EventBus.on('ui:switch:orders', Ui.switchContent.bind(null, 'orders'));

export default Ui;
