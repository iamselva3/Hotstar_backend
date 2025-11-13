// controller/movie4Controller.js
import fs from "fs";
import Movie4 from "../model/movie4model.js";

// Create Movie4
export const createMovie4 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const movie4Exist = await Movie4.findOne({ name });
    if (movie4Exist) {
      return res.status(400).json({ message: "Movie4 already exists" });
    }

    const newMovie4 = new Movie4({ name, image });
    const savedMovie4 = await newMovie4.save();

    res.status(200).json(savedMovie4);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Movie4s
export const getAllMovie4s = async (req, res) => {
  try {
    const movie4s = await Movie4.find();
    res.status(200).json(movie4s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Movie4s", error });
  }
};

// Get Movie4 by ID
export const getMovie4ById = async (req, res) => {
  try {
    const movie4 = await Movie4.findById(req.params.id);
    if (!movie4) {
      return res.status(404).json({ message: "Movie4 not found" });
    }
    res.status(200).json(movie4);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Movie4
export const updateMovie4 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedMovie4 = await Movie4.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Movie4 updated", updatedMovie4 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Movie4", error });
  }
};

// Delete Movie4
export const deleteMovie4 = async (req, res) => {
  try {
    const movie4 = await Movie4.findById(req.params.id);
    if (!movie4) {
      return res.status(404).json({ message: "Movie4 not found" });
    }

    fs.unlink(movie4.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Movie4.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie4 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Movie4", error });
  }
};
