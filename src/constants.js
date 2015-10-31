'use strict';
var path = require('path');

const constants = {
  APP_NAME: 'Deezer',
  APP_WIDTH: 1000,
  APP_HEIGHT: 650,
  APP_LOGO: path.join(__dirname, '../assets', 'logo.png'),

  PLAY_PAUSE: 'play-pause',
  NEXT: 'next',
  PREV: 'prev',
  SHUFFLE: 'shuffle',
  REPEAT: 'repeat',
};

module.exports = constants;
