'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');
var Account = require('../controllers/Account');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

function initRouting() {
    var controllers = {
        account: new Account(),
	};
	routes.setup(router, controllers);
	app.use(router);
}

function getInstance() {
	return app;
}


module.exports.initRouting = initRouting;
module.exports.getInstance = getInstance;