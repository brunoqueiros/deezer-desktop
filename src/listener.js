'use strict';

let events = [];

function createNewEvent(element, eventName, event) {
  events.push({
    'element': element,
    'eventName': eventName,
    'event': event
  });
}

function issetEvent(element, eventName) {
  let isset = false;

  events.forEach((event) => {
    if (event.eventName === eventName) {
      isset = true;
    }
  });

  return isset;
}

class Listener {
  one(element, eventName, callback) {
    if (!issetEvent(element, eventName)) {
      this.add(element, eventName, (event) => {
        callback(event);
      });
    }
  }

  add(element, eventName, callback) {
    createNewEvent(element, eventName, callback);
    element.addEventListener(eventName, (event) => {
      callback(event);
    });
  }
}

module.exports = new Listener();
