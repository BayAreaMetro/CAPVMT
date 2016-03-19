'use strict';

import mongoose from 'mongoose';

var MapdataSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Mapdata', MapdataSchema);
