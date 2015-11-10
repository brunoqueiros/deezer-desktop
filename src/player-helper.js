'use strict';
const imageDownloader = require('./image-downloader');
const constants = require('./constants');

let doc = null;

class PlayerHelper {
  constructor() {
    doc = document.getElementById('iframe').contentWindow.document;
  }

  playPause() {
    if (doc.querySelector(constants['CONTROL_PLAY'])) {
      doc.querySelector(constants['CONTROL_PLAY']).click();
    } else {
      doc.querySelector(constants['CONTROL_PAUSE']).click();
    }
  }

  repeat() {
    doc.querySelector(constants['CONTROL_REPEAT']).click();
  }

  shuffle() {
    doc.querySelector(constants['CONTROL_SHUFFLE']).click();
  }

  nextTrack() {
    doc.querySelector(constants['CONTROL_NEXT']).click();
  }

  prevTrack() {
    doc.querySelector(constants['CONTROL_PREV']).click();
  }

  getCurrentTrack() {
    return {
      'track-artist': doc.querySelector(constants['TRACK_ARTIST']).innerText,
      'track-name': doc.querySelector(constants['TRACK_NAME']).innerText,
    }
  }

  whenTrackChanged(callback) {
    let track = {};

    doc.querySelector(constants['TRACK_COVER']).addEventListener('load', (event) => {
      imageDownloader.download(event.path[0].src, (filename) => {
        track = this.getCurrentTrack();
        track['track-cover'] = filename;

        callback(track);
      });
    });
  }
}

module.exports = new PlayerHelper();
