import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createVideo2,
  getAllVideo2,
  getVideo2ById,
  updateVideo2,
  deleteVideo2,
} from "../controller/video2controller.js";

const routervideo2 = express.Router();

// Ensure upload directory exists
const uploadDir = "uploads/videos/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
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
routervideo2.post("/video2", upload.single("video"), createVideo2);
routervideo2.get("/video2", getAllVideo2);
routervideo2.get("/video2/:id", getVideo2ById);
routervideo2.put("/video2/:id", upload.single("video"), updateVideo2);
routervideo2.delete("/video2/:id", deleteVideo2);

export default routervideo2;
