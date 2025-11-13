// controller/tv2Controller.js
import fs from "fs";
import TV2 from "../model/tv2model.js";

// Create TV2
export const createTV2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const tv2Exist = await TV2.findOne({ name });
    if (tv2Exist) {
      return res.status(400).json({ message: "TV2 already exists" });
    }

    const newTV2 = new TV2({ name, image });
    const savedTV2 = await newTV2.save();

    res.status(200).json(savedTV2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All TV2s
export const getAllTV2s = async (req, res) => {
  try {
    const tv2s = await TV2.find();
    res.status(200).json(tv2s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV2s", error });
  }
};

// Get TV2 by ID
export const getTV2ById = async (req, res) => {
  try {
    const tv2 = await TV2.findById(req.params.id);
    if (!tv2) {
      return res.status(404).json({ message: "TV2 not found" });
    }
    res.status(200).json(tv2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update TV2
export const updateTV2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedTV2 = await TV2.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "TV2 updated", updatedTV2 });
  } catch (error) {
    res.status(500).json({ message: "Error updating TV2", error });
  }
};

// Delete TV2
export const deleteTV2 = async (req, res) => {
  try {
    const tv2 = await TV2.findById(req.params.id);
    if (!tv2) {
      return res.status(404).json({ message: "TV2 not found" });
    }

    fs.unlink(tv2.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await TV2.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "TV2 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting TV2", error });
  }
};
