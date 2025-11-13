// controller/series4Controller.js
import fs from "fs";
import Series4 from "../model/series4model.js";


// Create Series4
export const createSeries4 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const series4Exist = await Series4.findOne({ name });
    if (series4Exist) {
      return res.status(400).json({ message: "Series4 already exists" });
    }

    const newSeries4 = new Series4({ name, image });
    const savedSeries4 = await newSeries4.save();

    res.status(200).json(savedSeries4);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Series4
export const getAllSeries4s = async (req, res) => {
  try {
    const series4s = await Series4.find();
    res.status(200).json(series4s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Series4s", error });
  }
};

// Get Series4 by ID
export const getSeries4ById = async (req, res) => {
  try {
    const series4 = await Series4.findById(req.params.id);
    if (!series4) {
      return res.status(404).json({ message: "Series4 not found" });
    }
    res.status(200).json(series4);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Series4
export const updateSeries4 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSeries4 = await Series4.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Series4 updated", updatedSeries4 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Series4", error });
  }
};

// Delete Series4
export const deleteSeries4 = async (req, res) => {
  try {
    const series4 = await Series4.findById(req.params.id);
    if (!series4) {
      return res.status(404).json({ message: "Series4 not found" });
    }

    fs.unlink(series4.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Series4.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Series4 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Series4", error });
  }
};
