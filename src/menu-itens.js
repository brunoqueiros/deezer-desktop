'use strict';
const Shortcuts = require('./shortcuts');
const constants = require('./constants');

function setPlayItem(options) {
  let labelText = 'Pause';

  if (options.hasOwnProperty('control')) {
    const control = options.control;

    if (control.key === constants.PLAY_PAUSE && control.status === 'disable') {
      labelText = 'Play';
    }
  }

  return {
    label: labelText,
    click: function () {
      Shortcuts.send(constants.PLAY_PAUSE);
    }
  };
}

function setShuffleItem(options) {
  let isChecked = false;
  let isEnabled = true;

  if (options.hasOwnProperty('control')) {
    const control = options.control;

    if (control.key === constants.SHUFFLE && control.status === 'active') {
      isChecked = true;
    }

    if (control.control_options === 'disable') {
      isEnabled = false;
    }
  }

  return {
    label: 'Shuffle',
    type: 'checkbox',
    checked: isChecked,
    enabled: isEnabled,
    click: function () {
      Shortcuts.send(constants.SHUFFLE);
    }
  };
}


function setRepeatItem(options) {
  let isChecked = false;
  let isEnabled = true;

  if (options.hasOwnProperty('control')) {
    const control = options.control;

    if (control.key === constants.REPEAT && control.status === 'active') {
      isChecked = true;
    }

    if (control.control_options === 'disable') {
      isEnabled = false;
    }
  }

  return {
    label: 'Repeat',
    type: 'checkbox',
    checked: isChecked,
    enabled: isEnabled,
    click: function () {
      Shortcuts.send(constants.REPEAT);
    }
  };
}

module.exports.setItens = function (options) {
  let items = [];

  items.push({
    label: options.track['track-artist'] + ' - ' + options.track['track-name'],
    enabled: false
  });

  items.push({ type: 'separator' });

  items.push(setPlayItem(options));

  items.push({
    label: 'Next',
    click: function () {
      Shortcuts.send(constants.NEXT);
    }
  });

  items.push({
    label: 'Previous',
    click: function () {
      Shortcuts.send(constants.PREV);
    }
  });

  items.push({ type: 'separator' });

  items.push(setShuffleItem(options));

  items.push(setRepeatItem(options));

  items.push({
    label: 'Quit',
    click: function () {
      Shortcuts.send(constants.QUIT);
    }
  });

  return items;
};
