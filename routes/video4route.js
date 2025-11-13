import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createVideo4,
  getAllVideo4,
  getVideo4ById,
  updateVideo4,
  deleteVideo4,
} from "../controller/video4controller.js";

const routervideo4 = express.Router();

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
routervideo4.post("/video4", upload.single("video"), createVideo4);
routervideo4.get("/video4", getAllVideo4);
routervideo4.get("/video4/:id", getVideo4ById);
routervideo4.put("/video4/:id", upload.single("video"), updateVideo4);
routervideo4.delete("/video4/:id", deleteVideo4);

export default routervideo4;
