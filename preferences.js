'use strict';

const ipc = require('ipc');
const storage = require('./src/storage');

document.querySelector('#js-save-preferences').addEventListener('click', () => {
  storage.set('play_pause', document.querySelector('#play_pause').value);
  storage.set('next', document.querySelector('#next').value);
  storage.set('prev', document.querySelector('#prev').value);

  ipc.send('save-preferences', {
    'play_pause': document.querySelector('#play_pause').value,
    'next': document.querySelector('#next').value,
    'prev': document.querySelector('#prev').value
  });

  event.preventDefault();
});

document.querySelector('#play_pause').value = storage.get('play_pause') || constants.DEFAULT_SHORTCUTS.PLAY_PAUSE;
document.querySelector('#next').value = storage.get('next') || constants.DEFAULT_SHORTCUTS.NEXT;
document.querySelector('#prev').value = storage.get('prev') || constants.DEFAULT_SHORTCUTS.PREV;
