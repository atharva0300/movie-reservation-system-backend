const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logTypes = {
    'booking': 'booking-logs.txt',
    'auth': 'auth-logs.txt',
    'movie': 'movie-logs.txt',
    'notification': 'notification-logs.txt',
    'search': 'search-logs.txt',
    'user': 'user-logs.txt',
    'showtime': 'showtime-logs.txt',
    'general': 'general-logs.txt'
};

class SimpleLogger {
    constructor() {
        // Initialize default log file for 'general' type
        this.defaultFile = path.join(logDir, logTypes['general']);
    }

    _log(level , message, type = 'general') {
        const logFile = path.join(logDir, logTypes[type] || logTypes['general']);
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}\n`;

        // Print to console
        console.log(logMessage);
        
        // Append to the corresponding log file
        fs.appendFileSync(logFile, logMessage);
    }

    debug(message , type) {
        this._log('debug', message , type);
    }

    info(message , type) {
        this._log('info', message , type);
    }

    warn(message , type) {
        this._log('warn', message , type);
    }

    error(message , type) {
        this._log('error', message , type);
    }
}

// Create a default logger instance
const logger = new SimpleLogger();

module.exports = {
    logger
};
