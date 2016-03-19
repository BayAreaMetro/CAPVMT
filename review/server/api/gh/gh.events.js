/**
 * Gh model events
 */

'use strict';

import {EventEmitter} from 'events';
var Gh = require('./gh.model');
var GhEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GhEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Gh.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GhEvents.emit(event + ':' + doc._id, doc);
    GhEvents.emit(event, doc);
  }
}

export default GhEvents;
