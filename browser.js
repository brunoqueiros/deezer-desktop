'use strict';

const _ = require('lodash');
const ipc = require('ipc');
const PlayerHelper = require('./src/player-helper');
const constants = require('./src/constants');
const storage = require('./src/storage');

const DEBOUNCE_TIME = 2000;

ipc.on('did-finish-load', () => {
  let control = {
    'key': '',
    'status': 'disable',
    'control_options': 'active'
  };

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

  const sendNewTrack = _.debounce((track) => {
    ipc.send('new-track', {
      'notify': true,
      'control': control,
      'track': track
    });
  }, DEBOUNCE_TIME);

  PlayerHelper.whenTrackChanged(sendNewTrack);

  PlayerHelper.onControlHasClicked((mutation) => {
    control = {
      'key': '',
      'status': 'disable',
      'control_options': 'active'
    };

    if (mutation.target.classList.contains('active')) {
      control['status'] = 'active';
    }

    if (mutation.target.classList.contains('control-repeat') ||
        mutation.target.classList.contains('control-repeat-one')) {
      control['key'] = constants.REPEAT;

      if (mutation.target.classList.contains('control-repeat-one')) {
        control['status'] = 'disable';
      }
    }

    if (mutation.target.classList.contains('control-shuffle')) {
      control['key'] = constants.SHUFFLE;
    }

    if (mutation.target.classList.contains('control-play') ||
        mutation.target.classList.contains('control-pause')) {
      control['key'] = constants.PLAY_PAUSE;
      control['status'] = 'active';

      if (mutation.target.classList.contains('control-play')) {
        control['status'] = 'disable';
      }
    }

    if (PlayerHelper.isFlowActive()) {
      control['control_options'] = 'disable';
    }

    ipc.send('control-has-changed', {
      'control': control,
      'track': PlayerHelper.getCurrentTrack()
    });
  });

  ipc.send('new-track', {
    'notify': false,
    'control': control,
    'track': PlayerHelper.getCurrentTrack()
  });

  ipc.send('save-preferences', {
    'play_pause': storage.get('play_pause') || constants.DEFAULT_SHORTCUTS.PLAY_PAUSE,
    'next': storage.get('next') || constants.DEFAULT_SHORTCUTS.NEXT,
    'prev': storage.get('prev') || constants.DEFAULT_SHORTCUTS.PREV
  });
});
