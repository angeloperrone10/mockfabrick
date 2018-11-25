'use strict';
var config = require('./config.js');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

var Account = require('./controllers/Account');
var account = new Account();

var argv = require('minimist')(process.argv.slice(2));
var accountId = argv.accountId;

var balance = Promise.resolve(account.getBalance(accountId));

balance.then(function (out) {

    logger.info("Actual balance: " + out.payload[0].balance);

}).catch(function (error) {

    logger.error("Impossible to get actual balance: " + error);

});