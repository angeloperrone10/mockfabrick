'use strict';
const config = require('../config');
var express = require('express');
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
        var accountId = req.params.account ? req.params.account : undefined;

        if (accountId){

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
        } else {
            res.status(400).send("Please provide a valid accountId");
        }
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
        
        var accountId = req.params.account ? req.params.account : undefined;

        var receiverName = req.body.receiverName ? req.body.receiverName : undefined;
        var description = req.body.description ? req.body.description : undefined;
        var amount = req.body.amount ? req.body.amount : undefined;
        var currency = req.body.currency ? req.body.currency : undefined;
        var executionDate = moment.utc().format('DD-MM-YYYY');
        var feeType = req.body.feeType ? req.body.feeType : undefined;

        if (accountId && receiverName && description && amount && currency && feeType){
            
            var form = { receiverName: receiverName, description: description, amount: amount, currency: currency, executionDate: executionDate, feeType: feeType };
            var form_data = JSON.stringify(form);

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
                    res.status(200).send(info.status.code);
                } else {
                    logger.error("Order not created");
                    res.send(response.statusCode);
                }
            }

            Request.post(options, callback);
        } else {
            res.status(400).send();
        }
    };

    createOrder(args) {
        
        return new Promise(function (resolve, reject) {


            var accountId = args.accountId ? args.accountId : undefined;
            var receiverName = args.receiverName ? args.receiverName : undefined;
            var description = args.description ? args.description : undefined;
            var amount = args.amount ? args.amount : undefined;
            var currency = args.currency ? args.currency : undefined;
            var executionDate = moment.utc().format('DD-MM-YYYY');
            var feeType = args.feeType ? args.feeType : undefined;

            var form = { receiverName: receiverName, description: description, amount: amount, currency: currency, executionDate: executionDate, feeType: feeType };
            var form_data = JSON.stringify(form);


            if (accountId && receiverName && description && amount && currency && feeType){
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
                reject("Input not valid");
            }
        })
    };

};

module.exports = Account;