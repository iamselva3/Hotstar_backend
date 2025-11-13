// controller/sports3Controller.js
import fs from "fs";
import Sports3 from "../model/sports3model.js";


// Create Sports3
export const createSports3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const sports3Exist = await Sports3.findOne({ name });
    if (sports3Exist) {
      return res.status(400).json({ message: "Sports3 already exists" });
    }

    const newSports3 = new Sports3({ name, image });
    const savedSports3 = await newSports3.save();

    res.status(200).json(savedSports3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Sports3s
export const getAllSports3s = async (req, res) => {
  try {
    const sports3s = await Sports3.find();
    res.status(200).json(sports3s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Sports3s", error });
  }
};

// Get Sports3 by ID
export const getSports3ById = async (req, res) => {
  try {
    const sports3 = await Sports3.findById(req.params.id);
    if (!sports3) {
      return res.status(404).json({ message: "Sports3 not found" });
    }
    res.status(200).json(sports3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Sports3
export const updateSports3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedSports3 = await Sports3.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Sports3 updated", updatedSports3 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Sports3", error });
  }
};

// Delete Sports3
export const deleteSports3 = async (req, res) => {
  try {
    const sports3 = await Sports3.findById(req.params.id);
    if (!sports3) {
      return res.status(404).json({ message: "Sports3 not found" });
    }

    fs.unlink(sports3.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Sports3.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sports3 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Sports3", error });
  }
};
