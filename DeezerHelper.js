'use strict';

class DeezerHelper {
  constructor() {
    this.document = document.getElementById('iframe').contentWindow.document;
    this.setElements();
  }

  setElements() {
    this.elements = {
      'play': this.document.querySelector('.control-play'),
      'pause': this.document.querySelector('.control-pause')
    }
  }

  playPause() {
    if (this.elements['play']) {
      this.elements['play'].click();
    } else {
      this.elements['pause'].click();
    }
  }
}
