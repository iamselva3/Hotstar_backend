// routes/sports4Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSports4, deleteSports4, getAllSports4s, getSports4ById, updateSports4 } from "../controller/sports4controller.js";


const routeSports4 = express.Router();

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

// Sports4 Routes
routeSports4.post("/sports4_details", upload.single("image"), createSports4);
routeSports4.get("/sports4s", getAllSports4s);
routeSports4.get("/sports4/:id", getSports4ById);
routeSports4.put("/update/sports4/:id", upload.single("image"), updateSports4);
routeSports4.delete("/delete/sports4/:id", deleteSports4);

export default routeSports4;
