const Favorite = require('../Models/Favorites');

const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).populate('restaurantId');
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const addFavorite = async (req, res) => {
  const { restaurantId } = req.body;
  console.log('Request Body:', req.body);
  console.log('Authenticated User:', req.user);

  if (!restaurantId) {
    return res.status(400).json({ message: 'Restaurant ID is required' });
  }

  try {
    const favorite = await Favorite.create({ userId: req.user.id, restaurantId });
    const populatedFavorite = await Favorite.findById(favorite._id).populate('restaurantId').exec();
    res.status(201).json(populatedFavorite);
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    res.status(400).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    const favorite = await Favorite.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserFavorites, addFavorite, removeFavorite };
