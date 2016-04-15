'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const globalShortcut = require('global-shortcut');
const notifier = require('node-notifier');
const fs = require('fs');
const path = require('path');
const ipc = require('electron').ipcMain;
const Menu = require('electron').Menu;

const Shortcuts = require('./src/shortcuts');
const constants = require('./src/constants');
const Logger = require('./src/logger');
const TrayMenu = require('./src/tray-menu');

require('electron-debug')();
require('crash-reporter').start();

let prefWindow;
let mainWindow = null;

// Flash plugin
app.commandLine.appendSwitch('ppapi-flash-path', constants.FLASH_PLUGIN_PATH);
app.commandLine.appendSwitch('ppapi-flash-version', '16.0.0.305');

function createMainWindow() {
  const win = new BrowserWindow({
    'title': constants.APP_NAME,
    'width': constants.APP_WIDTH,
    'height': constants.APP_HEIGHT,
    'icon': constants.APP_LOGO,
    'webPreferences': {
      'plugins': true,
      'nodeIntegration': false,

      'preload': path.join(__dirname, 'browser.js')
    }
  });

  win.loadURL('http://deezer.com', {
    'userAgent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko'
  });

  if (process.env.NODE_ENV === 'development') {
    win.openDevTools();
  }

  return win;
}

function createTemporaryFolder() {
  if (!fs.existsSync(constants.APP_TMP_FOLDER)) {
    fs.mkdir(constants.APP_TMP_FOLDER, (error) => {
      if (error) {
        Logger.error(error);
      }
    });
  }
}

function registerShortcuts(obj) {
  Shortcuts.register({
    'key': constants.PLAY_PAUSE,
    'accelerator': obj.play_pause,
    'action': () => {
      mainWindow.webContents.send('action', constants.PLAY_PAUSE);
    }
  });

  Shortcuts.register({
    'key': constants.NEXT,
    'accelerator': obj.next,
    'action': () => {
      mainWindow.webContents.send('action', constants.NEXT);
    }
  });

  Shortcuts.register({
    'key': constants.PREV,
    'accelerator': obj.prev,
    'action': () => {
      mainWindow.webContents.send('action', constants.PREV);
    }
  });

  Shortcuts.register({
    'key': constants.REPEAT,
    'action': () => {
      mainWindow.webContents.send('action', constants.REPEAT);
    }
  });

  Shortcuts.register({
    'key': constants.SHUFFLE,
    'action': () => {
      mainWindow.webContents.send('action', constants.SHUFFLE);
    }
  });

  Shortcuts.register({
    'key': constants.QUIT,
    'action': () => {
      app.quit();
    }
  });
}

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

function createPrefWindow() {
  prefWindow = new BrowserWindow({
    width: 420,
    height: 400,
    show: false
  });
  prefWindow.loadURL('file://' + __dirname + '/index.html');
  prefWindow.on('closed', () => {
    prefWindow = null;
  });
  prefWindow.show();
}

function createMenu() {
  const template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Preferences',
          click() {
            createPrefWindow();
          }
        }
      ]
    }
  ];

  const menuItem = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menuItem);
}

app.on('ready', function() {
  mainWindow = createMainWindow();

  const page = mainWindow.webContents;

  createMenu();
  createTemporaryFolder();

  ipc.on('new-track', (event, obj) => {
    TrayMenu.create({
      'track': obj.track,
      'control': obj.control
    });

    if (obj.notify) {
      notifier.notify({
        'title': obj.track['track-artist'],
        'message': obj.track['track-name'],
        'icon': obj.track['track-cover']
      });
    }
  });

  ipc.on('control-has-changed', (event, obj) => {
    TrayMenu.create({
      'track': obj.track,
      'control': obj.control
    });
  });

  page.on('did-finish-load', () => {
    ipc.on('save-preferences', (event, obj) => {
      registerShortcuts(obj);
    });
    page.send('did-finish-load');
  });

    ipc.on('canigoback', function(event, arg) {
        console.log(arg);  // prints "ping"
        event.returnValue = page.canGoBack();
    });

    setInterval(function(){
        var js =  'window.canigoback='+page.canGoBack()+';';
        js =  js+'window.canGoForward='+page.canGoForward()+';';
        page.executeJavaScript(js);
    },1000);


    page.on('dom-ready', () => {
        var JS = `
    window.superbackmenu = function(){
        
        previous = document.getElementById('superbackmenu');
        if(previous){
            window.document.body.removeChild(previous);
        }
        var d = document.createElement("div");
        d.id = 'superbackmenu';
        d.style='z-index:1999999; position : absolute; left: 10px;top 0px;' ;
        
        var back = "";
        var forward = "" ;
        
        if(window.canigoback){
            back = '<span class="icon icon-carousel-left" style="font-size:32px;cursor:pointer;" onclick="window.history.back();" title="Back" ></span>'; 
        }else{
           back = '<span class="icon icon-carousel-left" style="font-size:32px;opacity: 0.3"  title="Back" ></span>' ;
        }
        if(window.canGoForward){
            forward = '<span class="icon icon-carousel-right" style="font-size:32px;cursor:pointer;" title="Forward" onclick="window.history.forward();" ></span>'; 
        }else{
           forward = '<span class="icon icon-carousel-right" style="font-size:32px;opacity: 0.3" title="Forward"  ></span>';
        }
        d.innerHTML= back+forward ;
      
        window.document.body.appendChild(d);
        document.getElementsByClassName('logo logo-deezer')[0].style='margin-left:60px';
    }
        var YesICan = false; 
        var YesICanForward = false ;
        setInterval(function(){
            if(window.canigoback !== YesICan){
                YesICan = window.canigoback ;
                window.superbackmenu();
            }
            if(window.canGoForward !== YesICanForward){
                YesICan = window.canigoback ;
                window.superbackmenu();
            }
        },1000);
        
        
        setTimeout(function(){
            window.superbackmenu();
            Events.subscribe('EVENT.NAVIGATION.page_changed', function() {
              window.superbackmenu();               
            });
        },500);
    
    
    `;

    page.executeJavaScript(JS);
});





  mainWindow.on('closed', () => {
    mainWindow = null;
  });


});
