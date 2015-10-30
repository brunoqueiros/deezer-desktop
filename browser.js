'use strict';
const ipc = require('ipc');

ipc.on('did-finish-load', () => {
  const deezerHelper = new DeezerHelper();

  ipc.on('keypress', (key) => {
    console.log(key);

    if (key === 'ctrl+Space') {
      deezerHelper.playPause();
    }
  });
});
