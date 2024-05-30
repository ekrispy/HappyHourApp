const Reviews = require("../models/reviews");
const mongoose = require("mongoose");

// seed data
const seedReviews = async (req, res) => {
  try {
    const reviewsData = require("../Db/reviews");
    await Reviews.deleteMany({}); // delete all reviews
    const newReviews = await Reviews.insertMany(reviewsData); // insert new reviews
    res.status(201).json(newReviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find().exec(); // Find all reviews
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get a single review
const getSingleReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }
  const review = await Reviews.findById(id);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  res.status(200).json(review);
};
//create a new review
const createNewReview = async (req, res) => {
  try {
    const { restaurantName, reviews } = req.body;
    const newReview = await Reviews.create({
      restaurantName,
      reviews: reviews.map((item) => ({
        rating: item.rating,
        comment: item.comment,
      })),
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }
  const review = await Reviews.findOneAndDelete({ _id: id });
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  res.status(200).json(review);
};
//update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }
  const review = await Reviews.findOneAndUpdate({ _id: id }, {...req.body });
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  res.status(200).json(review);
};

module.exports = {
  getAllReviews,
  getSingleReview,
  createNewReview,
  deleteReview,
  updateReview,
  seedReviews,
};