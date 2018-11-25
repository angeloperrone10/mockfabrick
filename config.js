var config = {};

// API
config.server_addr = 'localhost';
config.server_port = 9090;

// LOGGER
config.log4js = {
    appenders: {
        main: {
            type: 'file',
            filename: './logs/main.log'
        }
    },
    categories: {
        default: {
            appenders: ['main'],
            level: 'error'
        }
    }
}

module.exports = config;