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
      shortcutsList[options.key] = options.action;
      Logger.info('shortcut registered ' + options.key);

      if (options.accelerator) {
        const shortcut = globalShortcut.register(options.accelerator, options.action);

        if (!shortcut) {
          Logger.warn('registration failed ' + options.accelerator);
        }
      }
    } else {
      Logger.error('Already have a shortcut key ' + options.key);
    }
  }

  send(key) {
    if (shortcutsList[key]) {
      shortcutsList[key]();
    }
  }

  getAll() {
    console.log(shortcutsList);
  }
}

module.exports = new Shortcuts();
