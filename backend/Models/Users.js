const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favorite',
    }
  ]
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
