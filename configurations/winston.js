'use strict';

const appRoot = require('app-root-path');
const winston = require('winston');
//require('winston-daily-rotate-file');
const fs = require('fs');
const { format, transports } = winston;
//const logDir = `${__dirname}/logs/`;
const { combine, timestamp, label, prettyPrint, colorize } = format;

/*const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
});*/


/*const transport = new winston.transports.DailyRotateFile({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '2m',
    maxFiles: '14d'
})*/

/*if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}*/

const options = {
    file: {
        level: 'error',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            label({ label: 'The log is --> ' }),
            format.colorize(),
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            colorize(),
            prettyPrint(),
            format.printf(info => `${info.label} ${info.timestamp} ${info.level}: ${info.message}`)
        ),
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;