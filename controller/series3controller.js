// controller/series3Controller.js
import fs from "fs";
import Series3 from "../model/series3model.js";


// Create Series3
export const createSeries3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const series3Exist = await Series3.findOne({ name });
    if (series3Exist) {
      return res.status(400).json({ message: "Series3 already exists" });
    }

    const newSeries3 = new Series3({ name, image });
    const savedSeries3 = await newSeries3.save();

    res.status(200).json(savedSeries3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Series3
export const getAllSeries3s = async (req, res) => {
  try {
    const series3s = await Series3.find();
    res.status(200).json(series3s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Series3s", error });
  }
};

// Get Series3 by ID
export const getSeries3ById = async (req, res) => {
  try {
    const series3 = await Series3.findById(req.params.id);
    if (!series3) {
      return res.status(404).json({ message: "Series3 not found" });
    }
    res.status(200).json(series3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Series3
export const updateSeries3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSeries3 = await Series3.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Series3 updated", updatedSeries3 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Series3", error });
  }
};

// Delete Series3
export const deleteSeries3 = async (req, res) => {
  try {
    const series3 = await Series3.findById(req.params.id);
    if (!series3) {
      return res.status(404).json({ message: "Series3 not found" });
    }

    fs.unlink(series3.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Series3.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Series3 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Series3", error });
  }
};
