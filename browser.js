'use strict';

const _ = require('lodash');
const { ipcRenderer } = require('electron');
const PlayerHelper = require('./src/player-helper');
const constants = require('./src/constants');
const storage = require('./src/storage');

const DEBOUNCE_TIME = 2000;

ipcRenderer.on('did-finish-load', () => {
  let control = {
    'key': '',
    'status': 'disable',
    'control_options': 'active'
  };

  ipcRenderer.on('action', (event, type) => {
    if (type === constants.PLAY_PAUSE) {
      PlayerHelper.playPause();
    }

    if (type === constants.NEXT) {
      PlayerHelper.nextTrack();
    }

    if (type === constants.REPEAT) {
      PlayerHelper.repeat();
    }

    if (type === constants.PREV) {
      PlayerHelper.prevTrack();
    }

    if (type === constants.SHUFFLE) {
      PlayerHelper.shuffle();
    }
  });

  const sendNewTrack = _.debounce((track) => {
    ipcRenderer.send('new-track', {
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

    ipcRenderer.send('control-has-changed', {
      'control': control,
      'track': PlayerHelper.getCurrentTrack()
    });
  });

  ipcRenderer.send('new-track', {
    'notify': false,
    'control': control,
    'track': PlayerHelper.getCurrentTrack()
  });

  ipcRenderer.send('save-preferences', {
    'play_pause': storage.get('play_pause') || constants.DEFAULT_SHORTCUTS.PLAY_PAUSE,
    'next': storage.get('next') || constants.DEFAULT_SHORTCUTS.NEXT,
    'prev': storage.get('prev') || constants.DEFAULT_SHORTCUTS.PREV
  });
});
