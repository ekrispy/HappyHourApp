const express = require("express");
const {
  getAllReviews,
  getSingleReview,
  createNewReview,
  deleteReview,
  updateReview,
  seedReviews,
} = require("../Controllers/ReviewsController");

const router = express.Router();

router.get("/", getAllReviews);
router.get("/seed", seedReviews);

router.get("/:id", getSingleReview);
router.post("/", createNewReview);

router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);

module.exports = router;