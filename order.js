'use strict';
var config = require('./config.js');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

var Account = require('./controllers/Account');
var account = new Account();

var argv = require('minimist')(process.argv.slice(2));
var accountId = argv.accountId;

var order = Promise.resolve(account.createOrder(accountId));

order.then(function (out) {

    logger.info("Order created!");

}).catch(function (error) {

    logger.error("Impossible to create order: " + error);

});