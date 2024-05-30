const HappyHourMenu = require("../models/HappyHourMenu.js");
const mongoose = require("mongoose");


// seed data
const seedHappyHourMenu = async (req, res) => {
    try {
        const HappyHourMenuData = require("../Db/HappyHourMenu"); // import happyhour data
        await HappyHourMenu.deleteMany({}); // delete all happyhour
      const newHappyHourMenu = await HappyHourMenu.insertMany(HappyHourMenuData); // insert new happyhour
      res.status(201).json(newHappyHourMenu);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



//get all happyhourmenus
const getAllHappyHourMenus = async (req, res) => {
    const restaurants = await HappyHourMenu.find({}).sort({ _id: -1 });
    res.status(200).json(restaurants);
}

//get a single happyhourmenu
const getSingleHappyHourMenu = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Happy Hour" });
    }
    const restaurant = await HappyHourMenu.findById(id);
    if (!restaurant) {
        return res.status(404).json({ error: "Happy Hour not found" });
    }
    res.status(200).json(restaurant);
}




//create a new happyhourmenu

const createHappyHourMenu = async (req, res) => {
    const { name, happyHourMenu, happyHourHours } = req.body;
    try {
      const newHappyHourMenu = await HappyHourMenu.create({
        name,
        happyHourMenu: happyHourMenu.map((item) => ({ name: item.name, price: item.price })),
        happyHourHours,
      });
      res.status(201).json(newHappyHourMenu);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  




//delete a happyhourmenu
const deleteHappyHourMenu = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Happy Hour" });
    }
    const restaurant = await HappyHourMenu.findOneAndDelete({ _id: id });
    if (!restaurant) {
        return res.status(404).json({ error: "Happy Hour not found" });
    }
    res.status(200).json(restaurant);
}




//update a happyhourmenu
const updateHappyHourMenu = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Happy Hour" });
    }
    const restaurant = await HappyHourMenu.findOneAndUpdate(
        { _id: id },
        {
            ...req.body
        }
    );
    if (!restaurant) {
        return res.status(404).json({ error: "Happy Hour not found" });
    }
    res.status(200).json(restaurant);
}


module.exports = {
    getAllHappyHourMenus,
    getSingleHappyHourMenu,
    createHappyHourMenu,
    deleteHappyHourMenu,
    updateHappyHourMenu,    
    seedHappyHourMenu
}