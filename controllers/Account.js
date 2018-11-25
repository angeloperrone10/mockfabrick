'use strict';
const config = require('../config');
var express = require('express');
var app = express();
var self;
var Request = require("request");
var moment = require('moment');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

class Account {

    constructor() {
        self = this;
    }

    /*
    Set log level. If the parameter loggingLevel is not set, the level is set using the default from the config.js file
    */
    setLogLevel(loggingLevel) {
        mainLogger.setLevel((loggingLevel) ? loggingLevel : config.log4js.defaultLevel);
        dbLogger.setLevel((loggingLevel) ? loggingLevel : config.log4js.defaultLevel);
    }

    getBalanceForServer(req, res) {

        const options = {
            url: 'https://api.platfr.io/api/gbs/banking/v2/accounts/14537780/balance',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Schema': 'S2S'
            }
        };


        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const out = JSON.parse(body);
                logger.info("Get balance");
                res.status(200).send(out.payload[0].balance);
            } else {
                logger.error("Impossible to get actual balance: " + error);
                res.status(response.statusCode).send(error);
            }
        }

        Request(options, callback);
    };

    getBalance(accountId) {

        return new Promise(function (resolve, reject) {

            if (accountId) {
                const options = {
                    url: 'https://api.platfr.io/api/gbs/banking/v2/accounts/' + accountId + '/balance',
                    headers: {
                        'Content-Type': 'application/json',
                        'Auth-Schema': 'S2S'
                    }
                };

                function callback(error, response, body) {

                    if (!error && response.statusCode == 200) {
                        const info = JSON.parse(body);
                        resolve(info);
                        return null;
                    } else {
                        reject(error);
                    }
                }

                Request(options, callback);
            } else {
                reject("No accountId specified!")
            }
        })
    };

    createOrderForServer(req, res) {

        var accountId = 14537780;
        var form = { receiverName: 'Mario Rossi', description: 'Test order', amount: "100.00", currency: 'EUR', executionDate: moment.utc().format('DD-MM-YYYY'), feeType: "SHA" };
        var form_data = JSON.stringify(form);


        if (accountId) {
            const options = {
                method: 'POST',
                body: form_data,
                url: 'https://api.platfr.io/api/gbs/banking/v2.1/accounts/' + accountId + '/payments/sct/orders',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Auth-Schema': 'S2S'
                }
            };

            function callback(error, response, body) {

                if (!error && response.statusCode == 200) {
                    const info = JSON.parse(body);
                    logger.info("Order created");
                    res.status(200).send();
                } else {
                    logger.error("Order not created");
                    res.send(response.statusCode);
                }
            }

            Request.post(options, callback);
        } else {
            res.send(400).send();
        }
    };

    createOrder(accountId) {

        return new Promise(function (resolve, reject) {

            var form = { receiverName: 'Mario Rossi', description: 'Test order', amount: "100.00", currency: 'EUR', executionDate: moment.utc().format('DD-MM-YYYY'), feeType: "SHA" };
            var form_data = JSON.stringify(form);


            if (accountId) {
                const options = {
                    method: 'POST',
                    body: form_data,
                    url: 'https://api.platfr.io/api/gbs/banking/v2.1/accounts/' + accountId + '/payments/sct/orders',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Auth-Schema': 'S2S'
                    }
                };

                function callback(error, response, body) {

                    if (!error && response.statusCode == 200) {
                        const info = JSON.parse(body);
                        resolve(info);
                        return null;
                    } else {
                        reject(error);
                    }
                }

                Request.post(options, callback);
            } else {
                reject("No accountId specified!");
            }
        })
    };

};

module.exports = Account;