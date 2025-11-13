// controller/gbmController.js
import fs from "fs";
import GBM from "../model/gbmmodel.js";


// Create GBM
export const createGBM = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const gbmExist = await GBM.findOne({ name });
    if (gbmExist) {
      return res.status(400).json({ message: "GBM already exists" });
    }

    const newGBM = new GBM({ name, image });
    const savedGBM = await newGBM.save();

    res.status(200).json(savedGBM);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All GBMs
export const getAllGBMs = async (req, res) => {
  try {
    const gbms = await GBM.find();
    res.status(200).json(gbms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching GBMs", error });
  }
};

// Get GBM by ID
export const getGBMById = async (req, res) => {
  try {
    const gbm = await GBM.findById(req.params.id);
    if (!gbm) {
      return res.status(404).json({ message: "GBM not found" });
    }
    res.status(200).json(gbm);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update GBM
export const updateGBM = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedGBM = await GBM.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "GBM updated", updatedGBM });
  } catch (error) {
    res.status(500).json({ message: "Error updating GBM", error });
  }
};

// Delete GBM
export const deleteGBM = async (req, res) => {
  try {
    const gbm = await GBM.findById(req.params.id);
    if (!gbm) {
      return res.status(404).json({ message: "GBM not found" });
    }

    fs.unlink(gbm.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await GBM.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "GBM deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting GBM", error });
  }
};
