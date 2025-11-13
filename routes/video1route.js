import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createVideo1,
  getAllVideo1,
  getVideo1ById,
  updateVideo1,
  deleteVideo1,
} from "../controller/video1controller.js";

const routervideo1 = express.Router();

// Ensure video upload directory exists
const uploadDir = "uploads/videos/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|mkv/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
                  allowedTypes.test(file.mimetype);

  cb(null, isValid);
};

const upload = multer({ storage, fileFilter });

// Routes
routervideo1.post("/video1", upload.single("video"), createVideo1);
routervideo1.get("/video1", getAllVideo1);
routervideo1.get("/video1/:id", getVideo1ById);
routervideo1.put("/video1/:id", upload.single("video"), updateVideo1);
routervideo1.delete("/video1/:id", deleteVideo1);

export default routervideo1;
