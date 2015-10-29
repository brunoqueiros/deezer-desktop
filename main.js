var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var path = require('path');

// Report crashes to our server.
require('electron-debug')();
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

app.commandLine.appendSwitch('ppapi-flash-path', './plugins/libpepflashplayer.so');
app.commandLine.appendSwitch('ppapi-flash-version', '16.0.0.305');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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

  // and load the index.html of the app.
  mainWindow.loadUrl('http://deezer.com');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
