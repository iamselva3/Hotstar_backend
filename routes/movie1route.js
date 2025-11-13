// routes/movie1Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createMovie1, deleteMovie1, getAllMovie1s, getMovie1ById, updateMovie1 } from "../controller/movie1controller.js";


const routeMovie1 = express.Router();

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

// Movie1 Routes
routeMovie1.post("/movie1_details", upload.single("image"), createMovie1);
routeMovie1.get("/movie1s", getAllMovie1s);
routeMovie1.get("/movie1/:id", getMovie1ById);
routeMovie1.put("/update/movie1/:id", upload.single("image"), updateMovie1);
routeMovie1.delete("/delete/movie1/:id", deleteMovie1);

export default routeMovie1;
