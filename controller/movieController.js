 // Assuming file still named productModel.js
import fs from "fs";
import Movie from "../model/moviemodel.js";

// Create Movie
export const createMovie = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : ""; // Save file path

    // Check if movie already exists
    const movieExist = await Movie.findOne({ name });
    if (movieExist) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    // Create new movie
    const newMovie = new Movie({ name, image });
    const saveData = await newMovie.save();

    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching movies", error });
  }
};

// Get Movie by ID
export const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const movieExist = await Movie.findById(id);
    if (!movieExist) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movieExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Movie
export const updateMovie = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = req.file.path.replace(/\\/g, "/");
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Movie updated!", updatedMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating movie", error });
  }
};

// Delete Movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    // Delete the image file
    fs.unlink(movie.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Movie deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting movie", error });
  }
};
