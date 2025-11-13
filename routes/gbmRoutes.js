// routes/gbmRoute.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createGBM,
  deleteGBM,
  getAllGBMs,
  getGBMById,
  updateGBM,
} from "../controller/gbmController.js";

const routeGBM = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GBM Routes
routeGBM.post("/gbm_details", upload.single("image"), createGBM);
routeGBM.get("/gbms", getAllGBMs);
routeGBM.get("/gbm/:id", getGBMById);
routeGBM.put("/update/gbm/:id", upload.single("image"), updateGBM);
routeGBM.delete("/delete/gbm/:id", deleteGBM);

export default routeGBM;
