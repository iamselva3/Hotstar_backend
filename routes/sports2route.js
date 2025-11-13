// routes/sports2Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSports2, deleteSports2, getAllSports2s, getSports2ById, updateSports2 } from "../controller/sports2controller.js";


const routeSports2 = express.Router();

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

// Sports2 Routes
routeSports2.post("/sports2_details", upload.single("image"), createSports2);
routeSports2.get("/sports2s", getAllSports2s);
routeSports2.get("/sports2/:id", getSports2ById);
routeSports2.put("/update/sports2/:id", upload.single("image"), updateSports2);
routeSports2.delete("/delete/sports2/:id", deleteSports2);

export default routeSports2;
