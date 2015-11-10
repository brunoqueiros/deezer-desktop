'use strict';
const imageDownloader = require('./image-downloader');

let doc = null;
let elements = {};
let selectors = {}

class PlayerHelper {
  constructor() {
    doc = document.getElementById('iframe').contentWindow.document;
    elements = {
      'play': doc.querySelector('.control-play'),
      'pause': doc.querySelector('.control-pause'),
      'next': doc.querySelector('.control-next'),
      'prev': doc.querySelector('.control-prev'),
      'repeat': doc.querySelector('.control-repeat .icon'),
      'shuffle': doc.querySelector('.control-shuffle .icon'),
      'track-artist': doc.querySelector('.player-track-title .player-track-link'),
      'track-name': doc.querySelector('.player-track-artist .player-track-link'),
      'track': doc.querySelector('.player-track'),
      'track-cover': doc.querySelector('.player-cover img')
    };

    selectors = {
      'TRACK_ARTIST': '.player-track-title .player-track-link',
      'TRACK_NAME': '.player-track-title .player-track-link',
      'TRACK_COVER': '.player-cover img'
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
    elements['repeat'].click();
  }

  shuffle() {
    elements['shuffle'].click();
  }

  nextTrack() {
    elements['next'].click();
  }

  prevTrack() {
    elements['prev'].click();
  }

  getCurrentTrack() {
    return {
      'track-artist': doc.querySelector(selectors['TRACK_ARTIST']).innerText,
      'track-name': doc.querySelector(selectors['TRACK_NAME']).innerText,
    }
  }

  whenTrackChanged(callback) {
    let track = {};

    doc.querySelector(selectors['TRACK_COVER']).addEventListener('load', (event) => {
      imageDownloader.download(event.path[0].src, (filename) => {
        track = this.getCurrentTrack();
        track['track-cover'] = filename;

        callback(track);
      });
    });
  }
}

module.exports = new PlayerHelper();
