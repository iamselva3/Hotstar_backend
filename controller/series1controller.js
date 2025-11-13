// controller/series1Controller.js
import fs from "fs";
import Series1 from "../model/series1model.js";


// Create Series1
export const createSeries1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const series1Exist = await Series1.findOne({ name });
    if (series1Exist) {
      return res.status(400).json({ message: "Series1 already exists" });
    }

    const newSeries1 = new Series1({ name, image });
    const savedSeries1 = await newSeries1.save();

    res.status(200).json(savedSeries1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Series1
export const getAllSeries1s = async (req, res) => {
  try {
    const series1s = await Series1.find();
    res.status(200).json(series1s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Series1s", error });
  }
};

// Get Series1 by ID
export const getSeries1ById = async (req, res) => {
  try {
    const series1 = await Series1.findById(req.params.id);
    if (!series1) {
      return res.status(404).json({ message: "Series1 not found" });
    }
    res.status(200).json(series1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Series1
export const updateSeries1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSeries1 = await Series1.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Series1 updated", updatedSeries1 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Series1", error });
  }
};

// Delete Series1
export const deleteSeries1 = async (req, res) => {
  try {
    const series1 = await Series1.findById(req.params.id);
    if (!series1) {
      return res.status(404).json({ message: "Series1 not found" });
    }

    fs.unlink(series1.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Series1.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Series1 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Series1", error });
  }
};
