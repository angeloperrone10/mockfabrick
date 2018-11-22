var config = require('./configs/config');
var log4js = require("log4js");
var https = require('https');

log4js.configure(config.log4js.appenders);
var logger = log4js.getLogger('main');
logger.setLevel(config.log4js.defaultLevel);

var environment = process.env.NODE_ENV || 'development';
logger.info('Mockfabrick for ' + environment + ' environment.');

https.get('https://www.platfr.io/#/docs/api#Account%20Balance', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;

    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            logger.error(e.message);
        }
    });
}).on('error', (e) => {
    logger.error(`Got error: ${e.message}`);
});