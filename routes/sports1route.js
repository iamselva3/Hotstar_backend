// routes/sports1Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createSports1, deleteSports1, getAllSports1s, getSports1ById, updateSports1 } from "../controller/sports1controller.js";


const routeSports1 = express.Router();

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

// Sports1 Routes
routeSports1.post("/sports1_details", upload.single("image"), createSports1);
routeSports1.get("/sports1s", getAllSports1s);
routeSports1.get("/sports1/:id", getSports1ById);
routeSports1.put("/update/sports1/:id", upload.single("image"), updateSports1);
routeSports1.delete("/delete/sports1/:id", deleteSports1);

export default routeSports1;
