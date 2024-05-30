const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newHappyHourMenu = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3, // minimum length of 3 characters
      maxlength: 50, // maximum length of 50 characters // add validation for name
    },
    happyHourMenu: [
      {
        name: String,
        price: Number,
      },
      {
        name: String,
        price: Number,
      },
      {
        name: String,
        price: Number,
      },
    ],
    happyHourHours: { type: String },
  },
  { timestamps: true }
);

newHappyHourMenu.index({ name: 1 }); // create an index on the name field

module.exports = mongoose.model("HappyHourMenu", newHappyHourMenu);