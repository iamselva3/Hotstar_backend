// routes/tv1Route.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createTV1,
  deleteTV1,
  getAllTV1s,
  getTV1ById,
  updateTV1,
} from "../controller/tv1Controller.js";

const routeTV1 = express.Router();

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

// TV1 Routes
routeTV1.post("/tv1_details", upload.single("image"), createTV1);
routeTV1.get("/tv1s", getAllTV1s);
routeTV1.get("/tv1/:id", getTV1ById);
routeTV1.put("/update/tv1/:id", upload.single("image"), updateTV1);
routeTV1.delete("/delete/tv1/:id", deleteTV1);

export default routeTV1;
