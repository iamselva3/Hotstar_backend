// routes/series1Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSeries1, deleteSeries1, getAllSeries1s, getSeries1ById, updateSeries1 } from "../controller/series1controller.js";


const routeSeries1 = express.Router();

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

// Series1 Routes
routeSeries1.post("/series1_details", upload.single("image"), createSeries1);
routeSeries1.get("/series1s", getAllSeries1s);
routeSeries1.get("/series1/:id", getSeries1ById);
routeSeries1.put("/update/series1/:id", upload.single("image"), updateSeries1);
routeSeries1.delete("/delete/series1/:id", deleteSeries1);

export default routeSeries1;
