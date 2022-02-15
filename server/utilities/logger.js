const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');
const {Loggly} = require('winston-loggly-bulk');

const {nodeEnv, loggly} = require('../config/config');

class Logger{
    constructor(config={}) {
        // set directory
        this.directory = config.directory || path.join(__dirname, '../logs');
        this.date = new Date().toISOString();
        this.init();

    }

    init(){
        if (nodeEnv === 'production') {
            this.createLoggerObj();
            return;
        }
        this.createTransportObj();
        this.createLoggerObj();
    }

    createTransportObj() {
        const { DailyRotateFile } = winston.transports;
        this.transport = new DailyRotateFile({
            filename: path.join(this.directory, '/log-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'info'
        });
    }

    createLoggerObj() {
        if (nodeEnv !== 'production') {
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                transports: [this.transport],
                exitOnError: true
            });

            this.logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }));
        } else {
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.json(),
                exitOnError: true,
            });
            this.logger.add(new Loggly({
                token: loggly.token,
                subdomain: loggly.subdomain,
                tags: ["Winston-NodeJS"],
                json: true
            }));
        }
    }

    log(type, msg='', options={}) {
        const logMsg = {};

        const timestamp = this.date;
        logMsg.level = type || 'info';
        logMsg.time = timestamp;
        // if an error is sent through, get the stack
        // and remove it from msg for readability
        if (msg && msg.stack) {
            logMsg.msg = msg.message;
            if (nodeEnv !== 'production') logMsg.stack = msg.stack;
        }else{
            logMsg.msg = msg || '';
        }
        logMsg.desc = options.description || '';

        // get the user that made the request if available
        if (options.user) logMsg.user = options.user;

        // get the url endpoint that was hit if available
        if (options.url) logMsg.url = options.url;

        // get the ip address of the caller if available
        if (options.ip) logMsg.ip = options.ip;

        // get the body of the request if available
        if (options.body) logMsg.body = options.body;

        // get the query string of the request if available
        if (options.query) logMsg.query = options.query;

        // get the params string of the request if available
        if (options.params) logMsg.params = options.params;

        this.logger.log(type, logMsg);
    }

    info(msg, options) {
        return this.log('info', msg, options);
    }

    error(msg, options) {
        return this.log('error', msg, options);
    }

    warn(msg, options) {
        return this.log('warn', msg, options);
    }
}

module.exports = { Logger };