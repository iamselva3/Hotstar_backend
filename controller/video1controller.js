import fs from "fs";
import Video1 from "../model/video1model.js";

// Create Video1
export const createVideo1 = async (req, res) => {
  try {
    const { name } = req.body;
    const video = req.file ? `/uploads/videos/${req.file.filename}` : "";

    const videoExists = await Video1.findOne({ name });
    if (videoExists) {
      return res.status(400).json({ message: "Video1 already exists" });
    }

    const newVideo = new Video1({ name, video });
    const saved = await newVideo.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video1", error: error.message });
  }
};

// Get all Video1
export const getAllVideo1 = async (req, res) => {
  try {
    const videos = await Video1.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video1s", error: error.message });
  }
};

// Get Video1 by ID
export const getVideo1ById = async (req, res) => {
  try {
    const video = await Video1.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video1 not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video1", error: error.message });
  }
};

// Update Video1
export const updateVideo1 = async (req, res) => {
  try {
    const { name } = req.body;
    let video = req.body.video;

    if (req.file) {
      video = `/uploads/videos/${req.file.filename}`;
    }

    const updated = await Video1.findByIdAndUpdate(
      req.params.id,
      { name, video },
      { new: true }
    );

    res.status(200).json({ message: "Video1 updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating video1", error: error.message });
  }
};

// Delete Video1
export const deleteVideo1 = async (req, res) => {
  try {
    const video = await Video1.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video1 not found" });
    }

    fs.unlink(video.video, (err) => {
      if (err) console.log("Failed to delete video file:", err);
    });

    await Video1.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video1 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video1", error: error.message });
  }
};
