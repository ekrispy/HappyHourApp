const express = require("express");
const app = express();

const mongoose = require('mongoose');


require("dotenv").config();
const restaurants = require("../backend/Routes/Restaurants.js");
const reviews = require("../backend/Routes/Reviews.js");
const HappyHour = require("../backend/Routes/HappHourMenu.js");

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send(
    "Welcome! If you want to access any of the routes, please use the URL: /restaurants, /reviews, or /happyhour"
  );
});

app.use("/api/restaurants", restaurants);
app.use("/api/reviews", reviews);
app.use("/api/happyhour", HappyHour);

// Connect to DB with error handling
mongoose.connect(process.env.Atlas_URI)
 .then(() => {
    // Listen for requests
    const port = process.env.PORT || 3000; // default port if PORT is not set
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
 .catch((error) => {
    console.error(`Error connecting to DB: ${error.message}`); // log error with message
    process.exit(1); // exit with error code if DB connection fails
  });


