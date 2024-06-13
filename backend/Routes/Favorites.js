const express = require('express');
const { getUserFavorites, addFavorite, removeFavorite } = require('../Controllers/FavoritesController');
const auth = require('../Middleware/auth');

const router = express.Router();

router.get('/', auth, getUserFavorites);
router.post('/', auth, addFavorite);
router.delete('/:id', auth, removeFavorite);

module.exports = router;
