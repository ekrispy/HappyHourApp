const Favorite = require('../Models/Favorites');

// Handler to get a user's favorite restaurants
const getUserFavorites = async (req, res) => {
  try {
    // Find all favorite records for the authenticated user and populate the restaurant details
    const favorites = await Favorite.find({ userId: req.user.id }).populate('restaurantId');
    // Send the favorite records as a JSON response
    res.status(200).json(favorites);
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Handler to add a restaurant to the user's favorites
const addFavorite = async (req, res) => {
  const { restaurantId } = req.body;
  console.log('Request Body:', req.body);
  console.log('Authenticated User:', req.user);

  // Check if restaurantId is provided in the request body
  if (!restaurantId) {
    return res.status(400).json({ message: 'Restaurant ID is required' });
  }

  try {
    // Create a new favorite record with the authenticated user's ID and the provided restaurant ID
    const favorite = await Favorite.create({ userId: req.user.id, restaurantId });
    // Populate the restaurant details for the created favorite record
    const populatedFavorite = await Favorite.findById(favorite._id).populate('restaurantId').exec();
    // Send the created favorite record as a JSON response
    res.status(201).json(populatedFavorite);
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error('Error adding favorite:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Handler to remove a restaurant from the user's favorites
const removeFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the favorite record matching the provided ID and authenticated user's ID
    const favorite = await Favorite.findOneAndDelete({ _id: id, userId: req.user.id });
    // If no favorite record is found, respond with a 404 status and a message
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    // Respond with a success message if the favorite record is deleted
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    // Respond with an error message in case of failure
    res.status(500).json({ message: error.message });
  }
};

// Export the handlers for use in other parts of the application
module.exports = { getUserFavorites, addFavorite, removeFavorite };
