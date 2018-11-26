'use strict';

function setup(router, controllers) {

    router.get('/account/:account/balance/', controllers.account.getBalanceForServer);

    router.post('/account/:account/order', controllers.account.createOrderForServer);

}

exports.setup = setup;