import fs from "fs";
import Video2 from "../model/video2model.js";

// Create Video2
export const createVideo2 = async (req, res) => {
  try {
    const { name } = req.body;
    const video = req.file ? `/uploads/videos/${req.file.filename}` : "";

    const exists = await Video2.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Video2 already exists" });
    }

    const newVideo = new Video2({ name, video });
    const saved = await newVideo.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video2", error: error.message });
  }
};

// Get All Video2
export const getAllVideo2 = async (req, res) => {
  try {
    const videos = await Video2.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video2s", error: error.message });
  }
};

// Get Video2 by ID
export const getVideo2ById = async (req, res) => {
  try {
    const video = await Video2.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video2 not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video2", error: error.message });
  }
};

// Update Video2
export const updateVideo2 = async (req, res) => {
  try {
    const { name } = req.body;
    let video = req.body.video;

    if (req.file) {
      video = `/uploads/videos/${req.file.filename}`;
    }

    const updated = await Video2.findByIdAndUpdate(
      req.params.id,
      { name, video },
      { new: true }
    );

    res.status(200).json({ message: "Video2 updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating video2", error: error.message });
  }
};

// Delete Video2
export const deleteVideo2 = async (req, res) => {
  try {
    const video = await Video2.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video2 not found" });
    }

    fs.unlink(video.video, (err) => {
      if (err) console.log("Failed to delete video2 file:", err);
    });

    await Video2.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video2 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video2", error: error.message });
  }
};
