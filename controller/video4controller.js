import fs from "fs";
import Video4 from "../model/video4model.js";

// Create Video4
export const createVideo4 = async (req, res) => {
  try {
    const { name } = req.body;
    const video = req.file ? `/uploads/videos/${req.file.filename}` : "";

    const exists = await Video4.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Video4 already exists" });
    }

    const newVideo = new Video4({ name, video });
    const saved = await newVideo.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video4", error: error.message });
  }
};

// Get All Video4
export const getAllVideo4 = async (req, res) => {
  try {
    const videos = await Video4.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video4s", error: error.message });
  }
};

// Get Video4 by ID
export const getVideo4ById = async (req, res) => {
  try {
    const video = await Video4.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video4 not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video4", error: error.message });
  }
};

// Update Video4
export const updateVideo4 = async (req, res) => {
  try {
    const { name } = req.body;
    let video = req.body.video;

    if (req.file) {
      video = `/uploads/videos/${req.file.filename}`;
    }

    const updated = await Video4.findByIdAndUpdate(
      req.params.id,
      { name, video },
      { new: true }
    );

    res.status(200).json({ message: "Video4 updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating video4", error: error.message });
  }
};

// Delete Video4
export const deleteVideo4 = async (req, res) => {
  try {
    const video = await Video4.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video4 not found" });
    }

    fs.unlink(video.video, (err) => {
      if (err) console.log("Failed to delete video4 file:", err);
    });

    await Video4.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video4 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video4", error: error.message });
  }
};
