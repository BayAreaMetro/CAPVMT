'use strict';

import mongoose from 'mongoose';

var PlacesSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Places', PlacesSchema);
