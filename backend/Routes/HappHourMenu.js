const express = require("express");
const {
  getAllHappyHourMenus,
  getSingleHappyHourMenu,
  createHappyHourMenu,
  deleteHappyHourMenu,
  updateHappyHourMenu,
  seedHappyHourMenu,
} = require("../Controllers/HappyHourMenuController.js");
const router = express.Router();
// const restaurants = require('../Db/restaurants.js');

// Get all restaurants
router.get("/", getAllHappyHourMenus);

// seed data for a new restaurant
router.get("/seed", seedHappyHourMenu);

// Get a single restaurant
router.get("/:id", getSingleHappyHourMenu);

// Create a new restaurant
router.post("/", createHappyHourMenu);

// Delete a restaurant
router.delete("/:id", deleteHappyHourMenu);

// Update a restaurant
router.patch("/:id", updateHappyHourMenu);

module.exports = router;
