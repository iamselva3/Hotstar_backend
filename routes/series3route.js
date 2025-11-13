// routes/series3Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSeries3, deleteSeries3, getAllSeries3s, getSeries3ById, updateSeries3 } from "../controller/series3controller.js";


const routeSeries3 = express.Router();

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

// Series3 Routes
routeSeries3.post("/series3_details", upload.single("image"), createSeries3);
routeSeries3.get("/series3s", getAllSeries3s);
routeSeries3.get("/series3/:id", getSeries3ById);
routeSeries3.put("/update/series3/:id", upload.single("image"), updateSeries3);
routeSeries3.delete("/delete/series3/:id", deleteSeries3);

export default routeSeries3;
