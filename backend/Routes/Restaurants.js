const express = require("express");
const{createRestaurant, getAllRestaurants, getSingleRestaurant, deleteRestaurant, updateRestaurant, seedRestaurants} = require('../Controllers/RestaurantController.js')
const router = express.Router();
const auth = require('../Middleware/auth')
// const restaurants = require('../Db/restaurants.js');


// Get all restaurants
router.get("/", getAllRestaurants);

// seed data for a new restaurant
router.get("/seed", seedRestaurants);

// Get a single restaurant
router.get("/:id", getSingleRestaurant);

// Create a new restaurant
router.post("/", auth, createRestaurant);



// Delete a restaurant
router.delete("/:id", auth, deleteRestaurant);

// Update a restaurant
router.patch("/:id", auth, updateRestaurant);

module.exports = router;
