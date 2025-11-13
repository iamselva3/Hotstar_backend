// controller/tv3Controller.js
import fs from "fs";
import TV3 from "../model/tv3model.js";


// Create TV3
export const createTV3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const tv3Exist = await TV3.findOne({ name });
    if (tv3Exist) {
      return res.status(400).json({ message: "TV3 already exists" });
    }

    const newTV3 = new TV3({ name, image });
    const savedTV3 = await newTV3.save();

    res.status(200).json(savedTV3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All TV3s
export const getAllTV3s = async (req, res) => {
  try {
    const tv3s = await TV3.find();
    res.status(200).json(tv3s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV3s", error });
  }
};

// Get TV3 by ID
export const getTV3ById = async (req, res) => {
  try {
    const tv3 = await TV3.findById(req.params.id);
    if (!tv3) {
      return res.status(404).json({ message: "TV3 not found" });
    }
    res.status(200).json(tv3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update TV3
export const updateTV3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedTV3 = await TV3.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "TV3 updated", updatedTV3 });
  } catch (error) {
    res.status(500).json({ message: "Error updating TV3", error });
  }
};

// Delete TV3
export const deleteTV3 = async (req, res) => {
  try {
    const tv3 = await TV3.findById(req.params.id);
    if (!tv3) {
      return res.status(404).json({ message: "TV3 not found" });
    }

    fs.unlink(tv3.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await TV3.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "TV3 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting TV3", error });
  }
};
