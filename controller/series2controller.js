// controller/series2Controller.js
import fs from "fs";
import Series2 from "../model/series2model.js";


// Create Series2
export const createSeries2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const series2Exist = await Series2.findOne({ name });
    if (series2Exist) {
      return res.status(400).json({ message: "Series2 already exists" });
    }

    const newSeries2 = new Series2({ name, image });
    const savedSeries2 = await newSeries2.save();

    res.status(200).json(savedSeries2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Series2
export const getAllSeries2s = async (req, res) => {
  try {
    const series2s = await Series2.find();
    res.status(200).json(series2s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Series2s", error });
  }
};

// Get Series2 by ID
export const getSeries2ById = async (req, res) => {
  try {
    const series2 = await Series2.findById(req.params.id);
    if (!series2) {
      return res.status(404).json({ message: "Series2 not found" });
    }
    res.status(200).json(series2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Series2
export const updateSeries2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSeries2 = await Series2.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Series2 updated", updatedSeries2 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Series2", error });
  }
};

// Delete Series2
export const deleteSeries2 = async (req, res) => {
  try {
    const series2 = await Series2.findById(req.params.id);
    if (!series2) {
      return res.status(404).json({ message: "Series2 not found" });
    }

    fs.unlink(series2.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Series2.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Series2 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Series2", error });
  }
};
