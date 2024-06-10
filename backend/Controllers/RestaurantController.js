const Restaurants = require("../models/restaurants.js");
const mongoose = require("mongoose");


// seed data
//...
const seedRestaurants = async (req, res) => {
    try {
        const restaurantsData = require("../Db/restaurants"); // import restaurants data
        await Restaurants.deleteMany({}); // delete all restaurants
      const newRestaurants = await Restaurants.insertMany(restaurantsData); // insert new restaurants
      res.status(201).json(newRestaurants);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



//get all resturants
const getAllRestaurants = async (req, res) => {
    const restaurants = await Restaurants.find({}).sort({ _id: -1 });
    res.status(200).json(restaurants);
}

//get a single restaurant
const getSingleRestaurant = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such restaurant" });
    }
    const restaurant = await Restaurants.findById(id);
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
}




//create a new restaurant

const createRestaurant = async (req, res) => {
    const { name, address, cuisine, description, happyhour } = req.body;
    // add doc to db
    try {
      const newRestaurant = await Restaurants.create({
        name,
        address,
        cuisine,
        description,
        happyhour,
      });
      res.status(201).json(newRestaurant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}




//delete a restaurant
const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such restaurant" });
    }
    const restaurant = await Restaurants.findOneAndDelete({ _id: id });
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
}




//update a restaurant
const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such restaurant" });
    }
    const restaurant = await Restaurants.findOneAndUpdate(
        { _id: id },
        {
            ...req.body
        }
    );
    if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
}


module.exports = {
    getAllRestaurants,
    getSingleRestaurant,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant,
    seedRestaurants

}