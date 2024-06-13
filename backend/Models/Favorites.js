const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
