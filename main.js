'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var path = require('path');
var globalShortcut = require('global-shortcut');

require('electron-debug')();
require('crash-reporter').start();

let mainWindow = null;

// Flash plugin
app.commandLine.appendSwitch('ppapi-flash-path', './plugins/libpepflashplayer.so');
app.commandLine.appendSwitch('ppapi-flash-version', '16.0.0.305');

function createMainWindow() {
  const win = new BrowserWindow({
    'title': 'Deezer',
    'width': 1000,
    'height': 650,
    'icon': path.join(__dirname, 'assets', 'logo.png'),
    'web-preferences': {
      'plugins': true,
      'web-security': false,
      'node-integration': false,
      'preload': path.join(__dirname, 'browser.js')
    }
  });

  win.loadUrl('file://' + __dirname + '/index.html');

  if (process.env.NODE_ENV === 'development') {
    win.openDevTools();
  }

  return win;
}

function registerShortcut(shortcut, callback) {
  const ret = globalShortcut.register(shortcut, callback);

  if (!ret) {
    console.log('registration failed ' + shortcut);
  }
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = createMainWindow();

  const page = mainWindow.webContents;

  registerShortcut('ctrl+Space', () => {
    mainWindow.webContents.send('keypress', 'ctrl+Space');
  });

  page.on('did-finish-load', () => {
    page.send('did-finish-load');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
