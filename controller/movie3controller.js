// controller/movie3Controller.js
import fs from "fs";
import Movie3 from "../model/movie3model.js";

// Create Movie3
export const createMovie3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const movie3Exist = await Movie3.findOne({ name });
    if (movie3Exist) {
      return res.status(400).json({ message: "Movie3 already exists" });
    }

    const newMovie3 = new Movie3({ name, image });
    const savedMovie3 = await newMovie3.save();

    res.status(200).json(savedMovie3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Movie3s
export const getAllMovie3s = async (req, res) => {
  try {
    const movie3s = await Movie3.find();
    res.status(200).json(movie3s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Movie3s", error });
  }
};

// Get Movie3 by ID
export const getMovie3ById = async (req, res) => {
  try {
    const movie3 = await Movie3.findById(req.params.id);
    if (!movie3) {
      return res.status(404).json({ message: "Movie3 not found" });
    }
    res.status(200).json(movie3);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Movie3
export const updateMovie3 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedMovie3 = await Movie3.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Movie3 updated", updatedMovie3 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Movie3", error });
  }
};

// Delete Movie3
export const deleteMovie3 = async (req, res) => {
  try {
    const movie3 = await Movie3.findById(req.params.id);
    if (!movie3) {
      return res.status(404).json({ message: "Movie3 not found" });
    }

    fs.unlink(movie3.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Movie3.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie3 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Movie3", error });
  }
};
