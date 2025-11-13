// controller/sports1Controller.js
import fs from "fs";
import Sports1 from "../model/sports1model.js";


// Create Sports1
export const createSports1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const sports1Exist = await Sports1.findOne({ name });
    if (sports1Exist) {
      return res.status(400).json({ message: "Sports1 already exists" });
    }

    const newSports1 = new Sports1({ name, image });
    const savedSports1 = await newSports1.save();

    res.status(200).json(savedSports1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Sports1s
export const getAllSports1s = async (req, res) => {
  try {
    const sports1s = await Sports1.find();
    res.status(200).json(sports1s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Sports1s", error });
  }
};

// Get Sports1 by ID
export const getSports1ById = async (req, res) => {
  try {
    const sports1 = await Sports1.findById(req.params.id);
    if (!sports1) {
      return res.status(404).json({ message: "Sports1 not found" });
    }
    res.status(200).json(sports1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Sports1
export const updateSports1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSports1 = await Sports1.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Sports1 updated", updatedSports1 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Sports1", error });
  }
};

// Delete Sports1
export const deleteSports1 = async (req, res) => {
  try {
    const sports1 = await Sports1.findById(req.params.id);
    if (!sports1) {
      return res.status(404).json({ message: "Sports1 not found" });
    }

    fs.unlink(sports1.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Sports1.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sports1 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Sports1", error });
  }
};
