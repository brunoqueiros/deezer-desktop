'use strict';
const request = require('request');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const gc = require('./garbage-collector');

module.exports.download = function (uri, callback) {
  let filename = uri.split(constants.PLAYER_IMG_URI)[1];
  filename = filename.split('/')[0] + '.jpg';

  const PATH = path.join(constants.APP_TMP_FOLDER, filename);

  gc.clearFolder(path.join(constants.APP_TMP_FOLDER));

  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(PATH)).on('close', () => {
      callback(PATH);
    });
  });
};
