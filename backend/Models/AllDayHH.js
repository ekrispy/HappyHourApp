const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allDayHHSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    index: true, // create an index on the address field
  },
  cuisine: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  happyhour: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('AllDayHH', allDayHHSchema);