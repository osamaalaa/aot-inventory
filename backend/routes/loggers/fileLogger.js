function logging (req, res, next) {
    const opts = {
        errorEventName: 'error',
        logDirectory: './logs',
        fileNamePattern: 'roll-<DATE>.log',
        dateFormat: 'YYYY-MM-DD-HH-mm-ss'
    };
    const logger = require('simple-node-logger').createRollingFileLogger(opts);
    logger.info('subscription to ', 'Administrator', ' Accepted at ', new Date().toJSON());
    next();
}

module.exports = logging;