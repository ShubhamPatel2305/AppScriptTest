const mongoose = require('mongoose');

const syncMetaSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true }, // storing ISO date string
});

module.exports = mongoose.model('SyncMeta', syncMetaSchema);
