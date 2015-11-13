'use strict';
const imageDownloader = require('./image-downloader');
const constants = require('./constants');
const Listener = require('./listener');

let doc = null;
let lastTrackCover = '';

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
    if (doc.querySelector(constants['CONTROL_REPEAT'])) {
      doc.querySelector(constants['CONTROL_REPEAT']).click();
    }
  }

  shuffle() {
    if (doc.querySelector(constants['CONTROL_SHUFFLE'])) {
      doc.querySelector(constants['CONTROL_SHUFFLE']).click();
    }
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

    const target = doc.querySelector(constants['TRACK_NAME']);
    const observer = new MutationObserver((mutations) => {
      let isAlbumChanged = false;

      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-href') {
          isAlbumChanged = true;
        }
      });

      track = this.getCurrentTrack();

      if (isAlbumChanged) {
        Listener.one(doc.querySelector(constants['TRACK_COVER']), 'load', (event) => {
          imageDownloader.download(event.path[0].src, (filename) => {
            track['track-cover'] = filename;
            lastTrackCover = filename;

            callback(track);
          });
        });
      } else {
        track['track-cover'] = lastTrackCover;

        callback(track);
      }
    });
    const config = {
      childList: true,
      attributes: true
    };

    observer.observe(target, config);
  }

  onControlHasClicked(callback) {
    const target = doc.querySelector(constants.CONTROLS);
    const observer = new MutationObserver((mutations) => {
      const mutation = mutations[0];
      if (mutation.attributeName === 'class') {
        callback(mutation);
      }
    });
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    };

    observer.observe(target, config);
  }

  isFlowActive() {
    return doc.querySelector(constants['TAG']) !== null;
  }
}

module.exports = new PlayerHelper();
