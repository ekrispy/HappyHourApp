const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');

// Import routes
const restaurants = require("../backend/Routes/Restaurants.js");
const reviews = require("./Routes/Favorites.js");
const AllDayHH = require("../backend/Routes/AllDayHH.js");
const Users = require("../backend/Routes/Users.js");
const Favorites = require("../backend/Routes/Favorites.js");

// Middleware
app.use(express.json());
app.use(cors());  // Ensure CORS is correctly configured

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Base route
app.get("/", (req, res) => {
  res.send(
    "Welcome! If you want to access any of the routes, please use the URL: /restaurants, /reviews, or /happyhour"
  );
});

// Use routes
app.use("/api/restaurants", restaurants);
app.use("/api/reviews", reviews);
app.use("/api/alldayhh", AllDayHH);
app.use("/api/users", Users);
app.use("/api/favorites", Favorites);

// Connect to MongoDB with error handling
mongoose.connect(process.env.Atlas_URI)
  .then(() => {
    const port = process.env.PORT || 3000; // Default port if PORT is not set
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to DB: ${error.message}`); // Log error with message
    process.exit(1); // Exit with error code if DB connection fails
  });