
'use strict';
var path = require('path');

const constants = {
  APP_NAME: 'Deezer',
  APP_WIDTH: 1000,
  APP_HEIGHT: 650,
  APP_LOGO: path.join(__dirname, '../assets', 'logo.png'),
  APP_TMP_FOLDER: path.join(__dirname, '../.tmp'),

  PLAY_PAUSE: 'play-pause',
  NEXT: 'next',
  PREV: 'prev',
  SHUFFLE: 'shuffle',
  REPEAT: 'repeat',

  PLAYER_IMG_URI: 'deezer.com/images/cover/',
};

module.exports = constants;
