const mongoose = require('mongoose');
const User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and populate favorites with restaurant details
    let user = await User.findOne({ email }).populate({
      path: 'favorites',
      populate: {
        path: 'restaurantId',
        model: 'Restaurant'
      }
    });
    // If user not found, return error
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    // If password does not match, return error
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a payload for the token
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign and return the token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({
      username,
      email,
      passwordHash: await bcrypt.hash(password, 10), // Hash the password
    });

    // Save the user to the database
    await user.save();

    // Create a payload for the token
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign and return the token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Function to get a single user by ID
const getSingleUser = async (req, res) => {
  try {
    // Find user by ID and populate favorites with restaurant details
    const user = await User.findById(req.params.id).populate({
      path: 'favorites',
      populate: {
        path: 'restaurantId',
        model: 'Restaurant'
      }
    });
    // If user not found, return error
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    // Return the user details
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Export the functions
module.exports = {
  loginUser,
  createUser,
  getAllUsers,
  getSingleUser,
};
