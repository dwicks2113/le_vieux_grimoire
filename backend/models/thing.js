const mongoose = require('mongoose')

const thingSchema = mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  userId: String
})

module.exports = mongoose.model('Thing', thingSchema)
