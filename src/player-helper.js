'use strict';
const imageDownloader = require('./image-downloader');

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
      'track-artist': doc.querySelector('.player-track-title .player-track-link'),
      'track-name': doc.querySelector('.player-track-artist .player-track-link'),
      'track': doc.querySelector('.player-track'),
      'track-cover': doc.querySelector('.player-cover img')
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
    return elements['track-artist'] + ' ' + elements['track-name'];
  }

  whenTrackChanged(callback) {
    let track = {};

    elements['track'].addEventListener('DOMSubtreeModified', (mutation) => {
      if (mutation.target.nodeName === 'SPAN') {
        track['track-name'] = mutation.target.innerText;
      }

      if (mutation.target.nodeName === 'H3') {
        if (mutation.target.innerText.trim() !== 'by') {
          track['track-artist'] = mutation.target.innerText.split('by')[1].trim();
        }
      }
    });

    elements['track-cover'].addEventListener('load', (event) => {
      imageDownloader.download(event.path[0].src, (filename) => {
        track['track-cover'] = filename;

        callback(track);
      });
    });
  }
}

module.exports = new PlayerHelper();
