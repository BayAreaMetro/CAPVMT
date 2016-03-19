/**
 * Vmt model events
 */

'use strict';

import {EventEmitter} from 'events';
var Vmt = require('./vmt.model');
var VmtEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VmtEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vmt.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VmtEvents.emit(event + ':' + doc._id, doc);
    VmtEvents.emit(event, doc);
  }
}

export default VmtEvents;
