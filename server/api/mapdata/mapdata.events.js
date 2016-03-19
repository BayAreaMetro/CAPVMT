/**
 * Mapdata model events
 */

'use strict';

import {EventEmitter} from 'events';
var Mapdata = require('./mapdata.model');
var MapdataEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MapdataEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Mapdata.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MapdataEvents.emit(event + ':' + doc._id, doc);
    MapdataEvents.emit(event, doc);
  }
}

export default MapdataEvents;
