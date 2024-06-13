// models/Restaurant.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  happyhour: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
