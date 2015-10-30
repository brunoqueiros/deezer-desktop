'use strict';
const ipc = require('ipc');

ipc.on('keypress', (key) => {
  console.log(key);

  if (key === 'ctrl+Space') {
    var frameDocument = document.getElementById('iframe').contentWindow.document;

    if (frameDocument.querySelector('.control-play')) {
      frameDocument.querySelector('.control-play').click();
    } else {
      frameDocument.querySelector('.control-pause').click();
    }
  }
});
