// routes/tv3Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createTV3, deleteTV3, getAllTV3s, getTV3ById, updateTV3 } from "../controller/tv3contoller.js";


const routeTV3 = express.Router();

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

// TV3 Routes
routeTV3.post("/tv3_details", upload.single("image"), createTV3);
routeTV3.get("/tv3s", getAllTV3s);
routeTV3.get("/tv3/:id", getTV3ById);
routeTV3.put("/update/tv3/:id", upload.single("image"), updateTV3);
routeTV3.delete("/delete/tv3/:id", deleteTV3);

export default routeTV3;
