'use strict';
const chalk = require('chalk');

class Logger {
  info(message) {
    console.log('[INFO] ' + message);
  }

  error(message) {
    console.log(chalk.red('[ERROR] ') + message);
  }

  warn(message) {
    console.log(chalk.yellow('[WARN] ') + message);
  }
}

module.exports = new Logger();
