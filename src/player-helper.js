'use strict';

var doc = null;
var elements = {};

class PlayerHelper {
  constructor() {
    doc = document.getElementById('iframe').contentWindow.document;
    elements = {
      'play': doc.querySelector('.control-play'),
      'pause': doc.querySelector('.control-pause'),
      'next': doc.querySelector('.control-next'),
      'repeat': doc.querySelector('.control-repeat'),
      'trackArtist': doc.querySelector('.player-track-link'),
      'trackName': doc.querySelector('.player-track-link')
    };
  }

  playPause() {
    if (elements['play']) {
      elements['play'].click();
    } else {
      elements['pause'].click();
    }
  }

  repeat() {
    if (elements['repeat'].classList.contains('active')) {
      elements['repeat'].classList.remove('active');
    } else {
      elements['repeat'].classList.add('active');
    }
  }

  nextTrack() {
    elements['next'].click();
  }

  getCurrentMusic() {
    return elements['trackArtist'] + ' ' + elements['trackName'];
  }
}

module.exports = new PlayerHelper();
