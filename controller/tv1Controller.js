// controller/tv1Controller.js
import fs from "fs";
import TV1 from "../model/tv1model.js";


// Create TV1
export const createTV1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const tv1Exist = await TV1.findOne({ name });
    if (tv1Exist) {
      return res.status(400).json({ message: "TV1 already exists" });
    }

    const newTV1 = new TV1({ name, image });
    const savedTV1 = await newTV1.save();

    res.status(200).json(savedTV1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All TV1s
export const getAllTV1s = async (req, res) => {
  try {
    const tv1s = await TV1.find();
    res.status(200).json(tv1s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching TV1s", error });
  }
};

// Get TV1 by ID
export const getTV1ById = async (req, res) => {
  try {
    const tv1 = await TV1.findById(req.params.id);
    if (!tv1) {
      return res.status(404).json({ message: "TV1 not found" });
    }
    res.status(200).json(tv1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update TV1
export const updateTV1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedTV1 = await TV1.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "TV1 updated", updatedTV1 });
  } catch (error) {
    res.status(500).json({ message: "Error updating TV1", error });
  }
};

// Delete TV1
export const deleteTV1 = async (req, res) => {
  try {
    const tv1 = await TV1.findById(req.params.id);
    if (!tv1) {
      return res.status(404).json({ message: "TV1 not found" });
    }

    fs.unlink(tv1.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await TV1.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "TV1 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting TV1", error });
  }
};
