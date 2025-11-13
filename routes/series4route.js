// routes/series4Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSeries4, deleteSeries4, getAllSeries4s, getSeries4ById, updateSeries4 } from "../controller/series4controller.js";


const routeSeries4 = express.Router();

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

// Series4 Routes
routeSeries4.post("/series4_details", upload.single("image"), createSeries4);
routeSeries4.get("/series4s", getAllSeries4s);
routeSeries4.get("/series4/:id", getSeries4ById);
routeSeries4.put("/update/series4/:id", upload.single("image"), updateSeries4);
routeSeries4.delete("/delete/series4/:id", deleteSeries4);

export default routeSeries4;
