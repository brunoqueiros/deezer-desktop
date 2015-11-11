'use strict';
const ipc = require('ipc');
const PlayerHelper = require('./src/player-helper');
const constants = require('./src/constants');

ipc.on('did-finish-load', () => {
  ipc.on('action', (action) => {
    if (action === constants.PLAY_PAUSE) {
      PlayerHelper.playPause();
    }

    if (action === constants.NEXT) {
      PlayerHelper.nextTrack();
    }

    if (action === constants.REPEAT) {
      PlayerHelper.repeat();
    }

    if (action === constants.PREV) {
      PlayerHelper.prevTrack();
    }

    if (action === constants.SHUFFLE) {
      PlayerHelper.shuffle();
    }
  });

  PlayerHelper.whenTrackChanged((track) => {
    ipc.send('new-track', {
      'notify': true,
      'track': track
    });
  });

  PlayerHelper.onControlHasClicked((mutation) => {
    console.log(mutation);
  });

  ipc.send('new-track', {
    'notify': false,
    'track': PlayerHelper.getCurrentTrack()
  });
});
