'use strict';

function setup(router, controllers) {

    router.get('/account/balance', controllers.account.getBalanceForServer);

    router.get('/account/payment', controllers.account.createOrderForServer);

}

exports.setup = setup;