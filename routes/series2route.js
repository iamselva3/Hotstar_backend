// routes/series2Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSeries2, deleteSeries2, getAllSeries2s, getSeries2ById, updateSeries2 } from "../controller/series2controller.js";


const routeSeries2 = express.Router();

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

// Series2 Routes
routeSeries2.post("/series2_details", upload.single("image"), createSeries2);
routeSeries2.get("/series2s", getAllSeries2s);
routeSeries2.get("/series2/:id", getSeries2ById);
routeSeries2.put("/update/series2/:id", upload.single("image"), updateSeries2);
routeSeries2.delete("/delete/series2/:id", deleteSeries2);

export default routeSeries2;
