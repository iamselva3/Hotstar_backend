// routes/movie4Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createMovie4,
  deleteMovie4,
  getAllMovie4s,
  getMovie4ById,
  updateMovie4,
} from "../controller/movie4controller.js";

const routeMovie4 = express.Router();

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

// Movie4 Routes
routeMovie4.post("/movie4_details", upload.single("image"), createMovie4);
routeMovie4.get("/movie4s", getAllMovie4s);
routeMovie4.get("/movie4/:id", getMovie4ById);
routeMovie4.put("/update/movie4/:id", upload.single("image"), updateMovie4);
routeMovie4.delete("/delete/movie4/:id", deleteMovie4);

export default routeMovie4;
