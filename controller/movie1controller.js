// controller/movie1Controller.js
import fs from "fs";
import Movie1 from "../model/movie1model.js";


// Create Movie1
export const createMovie1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const movie1Exist = await Movie1.findOne({ name });
    if (movie1Exist) {
      return res.status(400).json({ message: "Movie1 already exists" });
    }

    const newMovie1 = new Movie1({ name, image });
    const savedMovie1 = await newMovie1.save();

    res.status(200).json(savedMovie1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Movie1s
export const getAllMovie1s = async (req, res) => {
  try {
    const movie1s = await Movie1.find();
    res.status(200).json(movie1s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Movie1s", error });
  }
};

// Get Movie1 by ID
export const getMovie1ById = async (req, res) => {
  try {
    const movie1 = await Movie1.findById(req.params.id);
    if (!movie1) {
      return res.status(404).json({ message: "Movie1 not found" });
    }
    res.status(200).json(movie1);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Movie1
export const updateMovie1 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedMovie1 = await Movie1.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Movie1 updated", updatedMovie1 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Movie1", error });
  }
};

// Delete Movie1
export const deleteMovie1 = async (req, res) => {
  try {
    const movie1 = await Movie1.findById(req.params.id);
    if (!movie1) {
      return res.status(404).json({ message: "Movie1 not found" });
    }

    fs.unlink(movie1.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Movie1.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie1 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Movie1", error });
  }
};
