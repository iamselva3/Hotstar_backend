// routes/sports3Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSports3, deleteSports3, getAllSports3s, getSports3ById, updateSports3 } from "../controller/sports3controller.js";


const routeSports3 = express.Router();

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

// Sports3 Routes
routeSports3.post("/sports3_details", upload.single("image"), createSports3);
routeSports3.get("/sports3s", getAllSports3s);
routeSports3.get("/sports3/:id", getSports3ById);
routeSports3.put("/update/sports3/:id", upload.single("image"), updateSports3);
routeSports3.delete("/delete/sports3/:id", deleteSports3);

export default routeSports3;
