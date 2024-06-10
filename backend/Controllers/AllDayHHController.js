const AllDayHH = require("../Models/AllDayHH.js");
const mongoose = require("mongoose");

// seed data
const seedAllDayHH = async (req, res) => {
  try {
    const allDayHHData = require("../Db/allDayHH"); // import AllDayHH data
    await AllDayHH.deleteMany({}); // delete all AllDayHH records
    const newAllDayHH = await AllDayHH.insertMany(allDayHHData); // insert new AllDayHH records
    res.status(201).json(newAllDayHH);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all AllDayHH records
const getAllAllDayHH = async (req, res) => {
  const allDayHH = await AllDayHH.find({}).sort({ _id: -1 });
  res.status(200).json(allDayHH);
}

// get a single AllDayHH record
const getSingleAllDayHH = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such AllDayHH record" });
  }
  const allDayHH = await AllDayHH.findById(id);
  if (!allDayHH) {
    return res.status(404).json({ error: "AllDayHH record not found" });
  }
  res.status(200).json(allDayHH);
}

// create a new AllDayHH record
const createAllDayHH = async (req, res) => {
  const { name, address, cuisine, description, happyhour } = req.body;
  // add doc to db
  try {
    const newAllDayHH = await AllDayHH.create({
      name,
      address,
      cuisine,
      description,
      happyhour,
    });
    res.status(201).json(newAllDayHH);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete an AllDayHH record
const deleteAllDayHH = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such AllDayHH record" });
  }
  const allDayHH = await AllDayHH.findOneAndDelete({ _id: id });
  if (!allDayHH) {
    return res.status(404).json({ error: "AllDayHH record not found" });
  }
  res.status(200).json(allDayHH);
}

// update an AllDayHH record
const updateAllDayHH = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such AllDayHH record" });
  }
  const allDayHH = await AllDayHH.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  );
  if (!allDayHH) {
    return res.status(404).json({ error: "AllDayHH record not found" });
  }
  res.status(200).json(allDayHH);
}

module.exports = {
  getAllAllDayHH,
  getSingleAllDayHH,
  createAllDayHH,
  deleteAllDayHH,
  updateAllDayHH,
  seedAllDayHH
}
