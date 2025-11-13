import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createVideo3,
  getAllVideo3,
  getVideo3ById,
  updateVideo3,
  deleteVideo3,
} from "../controller/video3controller.js";

const routervideo3 = express.Router();

// Ensure upload folder exists
const uploadDir = "uploads/videos/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /mp4|mov|avi|mkv/;
  const validExt = allowed.test(path.extname(file.originalname).toLowerCase());
  const validMime = allowed.test(file.mimetype);
  cb(null, validExt && validMime);
};

const upload = multer({ storage, fileFilter });

// Routes
routervideo3.post("/video3", upload.single("video"), createVideo3);
routervideo3.get("/video3", getAllVideo3);
routervideo3.get("/video3/:id", getVideo3ById);
routervideo3.put("/video3/:id", upload.single("video"), updateVideo3);
routervideo3.delete("/video3/:id", deleteVideo3);

export default routervideo3;
