// controller/sports4Controller.js
import fs from "fs";
import Sports4 from "../model/sports4model.js";


// Create Sports4
export const createSports4 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const sports4Exist = await Sports4.findOne({ name });
    if (sports4Exist) {
      return res.status(400).json({ message: "Sports4 already exists" });
    }

    const newSports4 = new Sports4({ name, image });
    const savedSports4 = await newSports4.save();

    res.status(200).json(savedSports4);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Sports4s
export const getAllSports4s = async (req, res) => {
  try {
    const sports4s = await Sports4.find();
    res.status(200).json(sports4s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Sports4s", error });
  }
};

// Get Sports4 by ID
export const getSports4ById = async (req, res) => {
  try {
    const sports4 = await Sports4.findById(req.params.id);
    if (!sports4) {
      return res.status(404).json({ message: "Sports4 not found" });
    }
    res.status(200).json(sports4);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Sports4
export const updateSports4 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSports4 = await Sports4.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Sports4 updated", updatedSports4 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Sports4", error });
  }
};

// Delete Sports4
export const deleteSports4 = async (req, res) => {
  try {
    const sports4 = await Sports4.findById(req.params.id);
    if (!sports4) {
      return res.status(404).json({ message: "Sports4 not found" });
    }

    fs.unlink(sports4.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Sports4.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sports4 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Sports4", error });
  }
};
