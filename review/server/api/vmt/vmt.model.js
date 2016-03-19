'use strict';

import mongoose from 'mongoose';

var VmtSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Vmt', VmtSchema);
