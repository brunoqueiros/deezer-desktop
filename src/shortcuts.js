'use strict';

const globalShortcut = require('global-shortcut');
const path = require('path');
const Logger = require('./logger');

let shortcutsList = [];

class Shortcuts {
  register(options) {
    if (!options.key) {
      throw 'Must be inform a shortcut key';
    }

    if (!shortcutsList[options.key]) {
      shortcutsList[options.key] = options;
      Logger.info('shortcut registered ' + options.key + " " + options.accelerator);

      if (options.accelerator) {
        const shortcut = globalShortcut.register(options.accelerator, options.action);

        if (!shortcut) {
          Logger.warn('registration failed ' + options.accelerator);
        }
      }
    } else {
      if (options.hasOwnProperty('accelerator')) {
        this.unregister(options);
        this.register(options);
      }
    }
  }

  send(key) {
    if (shortcutsList[key]) {
      shortcutsList[key].action();
    }
  }

  getAll() {
    console.log(shortcutsList);
  }

  unregister(options) {
    globalShortcut.unregister(shortcutsList[options.key].accelerator);
    delete shortcutsList[options.key];
    Logger.info('shortcut unregistered ' + options.key);
  }
}

module.exports = new Shortcuts();
