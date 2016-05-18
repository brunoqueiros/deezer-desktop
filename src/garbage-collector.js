'use strict';

const fs = require('fs');
const path = require('path');

module.exports.clearFolder = function(folder) {
  fs.readdirSync(folder).forEach((fileName) => {
    fs.unlinkSync(path.join(folder, fileName));
  });
};
