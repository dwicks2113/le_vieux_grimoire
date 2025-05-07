const mongoose = require('mongoose')

const thingSchema = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  license: { type: String, required: true},
  description: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);
