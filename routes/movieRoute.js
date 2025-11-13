import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controller/movieController.js"; // make sure file is renamed to movieController.js

const routemovie = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage for Movie Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Movie Routes
routemovie.post("/movie_details", upload.single("image"), createMovie);
routemovie.get("/movies", getAllMovies);
routemovie.get("/movie/:id", getMovieById);
routemovie.put("/update/movie/:id", upload.single("image"), updateMovie);
routemovie.delete("/delete/movie/:id", deleteMovie);

export default routemovie;
