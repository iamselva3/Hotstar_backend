// routes/movie2Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createMovie2,
  deleteMovie2,
  getAllMovie2s,
  getMovie2ById,
  updateMovie2,
} from "../controller/movie2controller.js";

const routeMovie2 = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Movie2 Routes
routeMovie2.post("/movie2_details", upload.single("image"), createMovie2);
routeMovie2.get("/movie2s", getAllMovie2s);
routeMovie2.get("/movie2/:id", getMovie2ById);
routeMovie2.put("/update/movie2/:id", upload.single("image"), updateMovie2);
routeMovie2.delete("/delete/movie2/:id", deleteMovie2);

export default routeMovie2;
