'use strict';
const ipc = require('ipc');
const PlayerHelper = require('./src/player-helper');

ipc.on('did-finish-load', () => {
  ipc.on('keypress', (key) => {
    console.log(key);

    if (key === 'ctrl+Space') {
      PlayerHelper.playPause();
    }

    if (key === 'repeat') {
      PlayerHelper.repeat();
    }
  });
});
