'use strict';
const Shortcuts = require('./shortcuts');
const constants = require('./constants');

module.exports.setItens = function (options) {
  return [
    {
      label: options.track['track-artist'] + ' - ' + options.track['track-name'],
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Play',
      click: function () {
        Shortcuts.send(constants.PLAY_PAUSE);
      }
    },
    {
      label: 'Next',
      click: function () {
        Shortcuts.send(constants.NEXT);
      }
    },
    {
      label: 'Previous',
      click: function () {
        Shortcuts.send(constants.PREV);
      }
    },
    { type: 'separator' },
    {
      label: 'Shuffle',
      type: 'checkbox',
      click: function () {
        Shortcuts.send(constants.SHUFFLE);
      }
    },
    {
      label: 'Repeat',
      type: 'checkbox',
      click: function () {
        Shortcuts.send(constants.REPEAT);
      }
    },
    {
      label: 'Quit',
      click: function () {
        Shortcuts.send(constants.QUIT);
      }
    }
  ];
};
