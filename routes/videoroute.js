// routes/videoRoute.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} from "../controller/videocontroller.js";

const routeVideo = express.Router();

// Ensure video upload directory exists
const uploadDir = "uploads/videos/";
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

// File filter to only allow video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov|avi|mkv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

// Video Routes
routeVideo.post("/video_details", upload.single("video"), uploadVideo);
routeVideo.get("/videos", getAllVideos);
routeVideo.get("/video/:id", getVideoById);
routeVideo.put("/update/video/:id", upload.single("video"), updateVideo);
routeVideo.delete("/delete/video/:id", deleteVideo);

export default routeVideo;
