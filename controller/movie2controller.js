// controller/movie2Controller.js
import fs from "fs";
import Movie2 from "../model/movie2model.js";


// Create Movie2
export const createMovie2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const movie2Exist = await Movie2.findOne({ name });
    if (movie2Exist) {
      return res.status(400).json({ message: "Movie2 already exists" });
    }

    const newMovie2 = new Movie2({ name, image });
    const savedMovie2 = await newMovie2.save();

    res.status(200).json(savedMovie2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Movie2s
export const getAllMovie2s = async (req, res) => {
  try {
    const movie2s = await Movie2.find();
    res.status(200).json(movie2s);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Movie2s", error });
  }
};

// Get Movie2 by ID
export const getMovie2ById = async (req, res) => {
  try {
    const movie2 = await Movie2.findById(req.params.id);
    if (!movie2) {
      return res.status(404).json({ message: "Movie2 not found" });
    }
    res.status(200).json(movie2);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Movie2
export const updateMovie2 = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedMovie2 = await Movie2.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ message: "Movie2 updated", updatedMovie2 });
  } catch (error) {
    res.status(500).json({ message: "Error updating Movie2", error });
  }
};

// Delete Movie2
export const deleteMovie2 = async (req, res) => {
  try {
    const movie2 = await Movie2.findById(req.params.id);
    if (!movie2) {
      return res.status(404).json({ message: "Movie2 not found" });
    }

    fs.unlink(movie2.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Movie2.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie2 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Movie2", error });
  }
};
