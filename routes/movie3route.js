// routes/movie3Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createMovie3,
  deleteMovie3,
  getAllMovie3s,
  getMovie3ById,
  updateMovie3,
} from "../controller/movie3controller.js";

const routeMovie3 = express.Router();

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

// Movie3 Routes
routeMovie3.post("/movie3_details", upload.single("image"), createMovie3);
routeMovie3.get("/movie3s", getAllMovie3s);
routeMovie3.get("/movie3/:id", getMovie3ById);
routeMovie3.put("/update/movie3/:id", upload.single("image"), updateMovie3);
routeMovie3.delete("/delete/movie3/:id", deleteMovie3);

export default routeMovie3;
