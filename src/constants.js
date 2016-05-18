'use strict';

const path = require('path');

const constants = {
  APP_NAME: 'Deezer',
  APP_WIDTH: 1000,
  APP_HEIGHT: 650,
  APP_LOGO: path.join(__dirname, '../assets', 'logo.png'),
  APP_TMP_FOLDER: path.join(__dirname, '../.tmp'),
  FLASH_PLUGIN_PATH: path.join(__dirname, '../plugins', 'libpepflashplayer.so'),

  PLAY_PAUSE: 'play-pause',
  NEXT: 'next',
  PREV: 'prev',
  SHUFFLE: 'shuffle',
  REPEAT: 'repeat',
  GET_CURRENT_TRACK: 'get-current-track',
  QUIT: 'quit',

  PLAYER_IMG_URI: 'deezer.com/images/cover/',

  TRACK_ARTIST: '.player-track-artist .player-track-link',
  TRACK_NAME: '.player-track-title .player-track-link',
  TRACK_COVER: '.player-cover img',

  CONTROL_PLAY: '.control-play',
  CONTROL_PAUSE: '.control-pause',
  CONTROL_NEXT: '.control-next',
  CONTROL_PREV: '.control-prev',
  CONTROL_REPEAT: '.control-repeat .icon',
  CONTROL_SHUFFLE: '.control-shuffle .icon',
  CONTROLS: '.player-controls',
  TAG: '.tag',

  DEFAULT_SHORTCUTS: {
    PLAY_PAUSE: 'MediaPlayPause',
    NEXT: 'MediaNextTrack',
    PREV: 'MediaPreviousTrack'
  }
};

module.exports = constants;
