// controller/sports2Controller.js
import fs from "fs";
import Sports2 from "../model/sports2model.js";


// Create Sports2
export const createSports2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const sports2Exist = await Sports2.findOne({ name });
    if (sports2Exist) {
      return res.status(400).json({ message: "Sports2 already exists" });
    }

    const newSports2 = new Sports2({ name, image });
    const savedSports2 = await newSports2.save();

    res.status(200).json(savedSports2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Sports2s
export const getAllSports2s = async (req, res) => {
  try {
    const sports2s = await Sports2.find();
    res.status(200).json(sports2s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Sports2s", error });
  }
};

// Get Sports2 by ID
export const getSports2ById = async (req, res) => {
  try {
    const sports2 = await Sports2.findById(req.params.id);
    if (!sports2) {
      return res.status(404).json({ message: "Sports2 not found" });
    }
    res.status(200).json(sports2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Sports2
export const updateSports2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSports2 = await Sports2.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Sports2 updated", updatedSports2 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Sports2", error });
  }
};

// Delete Sports2
export const deleteSports2 = async (req, res) => {
  try {
    const sports2 = await Sports2.findById(req.params.id);
    if (!sports2) {
      return res.status(404).json({ message: "Sports2 not found" });
    }

    fs.unlink(sports2.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Sports2.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sports2 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Sports2", error });
  }
};
