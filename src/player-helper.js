'use strict';

class PlayerHelper {
  constructor() {
    this.document = document.getElementById('iframe').contentWindow.document;
    this.setElements();
  }

  setElements() {
    this.elements = {
      'play': this.document.querySelector('.control-play'),
      'pause': this.document.querySelector('.control-pause'),
      'repeat': this.document.querySelector('.control-repeat'),
      'trackArtist': this.document.querySelector('.player-track-link'),
      'trackName': this.document.querySelector('.player-track-link')
    }
  }

  playPause() {
    if (this.elements['play']) {
      this.elements['play'].click();
    } else {
      this.elements['pause'].click();
    }
  }

  repeat() {
    if (this.elements['repeat'].classList.contains('active')) {
      this.elements['repeat'].classList.remove('active');
    } else {
      this.elements['repeat'].classList.add('active');
    }
  }

  getCurrentMusic() {
    return this.elements['trackArtist'] + ' ' + this.elements['trackName'];
  }
}

module.exports = new PlayerHelper();
