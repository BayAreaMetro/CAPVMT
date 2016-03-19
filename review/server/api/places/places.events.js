/**
 * Places model events
 */

'use strict';

import {EventEmitter} from 'events';
var Places = require('./places.model');
var PlacesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlacesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Places.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PlacesEvents.emit(event + ':' + doc._id, doc);
    PlacesEvents.emit(event, doc);
  }
}

export default PlacesEvents;
