'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const globalShortcut = require('global-shortcut');
const notifier = require('node-notifier');
const fs = require('fs');

const Shortcuts = require('./src/shortcuts');
const constants = require('./src/constants');
const Logger = require('./src/logger');

require('electron-debug')();
require('crash-reporter').start();

let mainWindow = null;

// Flash plugin
app.commandLine.appendSwitch('ppapi-flash-path', './plugins/libpepflashplayer.so');
app.commandLine.appendSwitch('ppapi-flash-version', '16.0.0.305');

function createMainWindow() {
  const win = new BrowserWindow({
    'title': constants.APP_NAME,
    'width': constants.APP_WIDTH,
    'height': constants.APP_HEIGHT,
    'icon': constants.APP_LOGO,
    'web-preferences': {
      'plugins': true
    }
  });

  win.loadUrl('file://' + __dirname + '/index.html');

  if (process.env.NODE_ENV === 'development') {
    win.openDevTools();
  }

  return win;
}

function createTemporaryFolder() {
  if (!fs.existsSync(constants.APP_TMP_FOLDER)) {
    fs.mkdir(constants.APP_TMP_FOLDER, (error) => {
      if (error) {
        Logger.error(err);
      }
    });
  }
}

function registerShortcuts() {
  Shortcuts.register({
    'key': constants.PLAY_PAUSE,
    'accelerator': 'MediaPlayPause',
    'action': () => {
      mainWindow.webContents.send('action', constants.PLAY_PAUSE);
    }
  });

  Shortcuts.register({
    'key': constants.NEXT,
    'accelerator': 'MediaNextTrack',
    'action': () => {
      mainWindow.webContents.send('action', constants.NEXT);
    }
  });

  Shortcuts.register({
    'key': constants.PREV,
    'accelerator': 'MediaPreviousTrack',
    'action': () => {
      mainWindow.webContents.send('action', constants.PREV);
    }
  });

  Shortcuts.register({
    'key': 'repeat',
    'action': () => {
      DeezerHelper.getCurrentMusic();
    }
  });
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

const ipc = require('ipc');

app.on('ready', function() {
  mainWindow = createMainWindow();

  const page = mainWindow.webContents;

  createTemporaryFolder();

  ipc.on('new-track', (event, track) => {
    notifier.notify({
      'title': track['track-artist'],
      'message': track['track-name'],
      'icon': track['track-cover']
    });
  });

  page.on('did-finish-load', () => {
    registerShortcuts();

    page.send('did-finish-load');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
