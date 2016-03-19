'use strict';

import mongoose from 'mongoose';

var ModelrunsSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Modelruns', ModelrunsSchema);
