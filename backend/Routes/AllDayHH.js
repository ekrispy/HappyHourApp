const express = require("express");
const {
  getAllAllDayHH,
  getSingleAllDayHH,
  createAllDayHH,
  deleteAllDayHH,
  updateAllDayHH,
  seedAllDayHH,
} = require("../Controllers/AllDayHHController.js");
const router = express.Router();

// Get all AllDayHH
router.get("/", getAllAllDayHH);

// Seed data for AllDayHH
router.get("/seed", seedAllDayHH);

// Get a single AllDayHH
router.get("/:id", getSingleAllDayHH);

// Create a new AllDayHH
router.post("/", createAllDayHH);

// Delete an AllDayHH
router.delete("/:id", deleteAllDayHH);

// Update an AllDayHH
router.patch("/:id", updateAllDayHH);

module.exports = router;
