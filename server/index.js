'use strict';
var config = require('../config.js');
var app = require('./app');
var http = require('http');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

app.initRouting();

var server = http.createServer(app.getInstance()).listen(config.server_port, function () {
    logger.debug('server listening on http://' + config.server_addr + ':' + config.server_port);
});