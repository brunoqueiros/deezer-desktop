'use strict';
const Tray = require('tray');
const Menu = require('menu');
const constants = require('./constants');
const menuItems = require('./menu-itens');

let appTray = null;

class TrayMenu {
  create(options) {
    if (appTray === null) {
      appTray = new Tray(constants.APP_LOGO);
    }

    const itens = menuItems.setItens(options);
    const contextMenu = Menu.buildFromTemplate(itens);

    appTray.setToolTip(constants.APP_NAME);
    appTray.setContextMenu(contextMenu);
  }
}

module.exports = new TrayMenu();
