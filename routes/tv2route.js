// routes/tv2Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createTV2, deleteTV2, getAllTV2s, getTV2ById, updateTV2 } from "../controller/tv2controller.js";


const routeTV2 = express.Router();

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

// TV2 Routes
routeTV2.post("/tv2_details", upload.single("image"), createTV2);
routeTV2.get("/tv2s", getAllTV2s);
routeTV2.get("/tv2/:id", getTV2ById);
routeTV2.put("/update/tv2/:id", upload.single("image"), updateTV2);
routeTV2.delete("/delete/tv2/:id", deleteTV2);

export default routeTV2;
