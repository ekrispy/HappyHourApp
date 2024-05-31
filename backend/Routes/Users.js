const express = require('express');
const router = express.Router();
const { getAllUsers, getSingleUser, createUser, loginUser } = require('../controllers/UserController');

// Route to get all users
router.get('/', getAllUsers);

// Route to get a single user by ID
router.get('/:id', getSingleUser);

// Route to create a new user
router.post('/register', createUser);

// Route to login user
router.post('/login', loginUser);

module.exports = router;
