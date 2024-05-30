const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Reviews", reviewSchema);