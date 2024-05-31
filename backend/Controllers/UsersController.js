const mongoose = require("mongoose");
const User = require("../models/UserSchema");

const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get single user
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// create new user
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user with the hashed password
        const newUser = await User.create({
            username,
            email,
            passwordHash
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllUsers, getSingleUser, createUser, loginUser };
