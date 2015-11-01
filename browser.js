'use strict';
const ipc = require('ipc');
const PlayerHelper = require('./src/player-helper');
const constants = require('./src/constants');

let track = {};

ipc.on('did-finish-load', () => {
  ipc.on('action', (action) => {
    console.log(action);

    if (action === constants.PLAY_PAUSE) {
      PlayerHelper.playPause();
    }

    if (action === constants.NEXT) {
      PlayerHelper.nextTrack();
    }

    if (action === constants.REPEAT) {
      PlayerHelper.repeat();
    }
  });
});
