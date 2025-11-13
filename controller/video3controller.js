import fs from "fs";
import Video3 from "../model/video3model.js";

// Create Video3
export const createVideo3 = async (req, res) => {
  try {
    const { name } = req.body;
    const video = req.file ? `/uploads/videos/${req.file.filename}` : "";

    const exists = await Video3.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Video3 already exists" });
    }

    const newVideo = new Video3({ name, video });
    const saved = await newVideo.save();
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video3", error: error.message });
  }
};

// Get All Video3
export const getAllVideo3 = async (req, res) => {
  try {
    const videos = await Video3.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video3s", error: error.message });
  }
};

// Get Video3 by ID
export const getVideo3ById = async (req, res) => {
  try {
    const video = await Video3.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video3 not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video3", error: error.message });
  }
};

// Update Video3
export const updateVideo3 = async (req, res) => {
  try {
    const { name } = req.body;
    let video = req.body.video;

    if (req.file) {
      video = `/uploads/videos/${req.file.filename}`;
    }

    const updated = await Video3.findByIdAndUpdate(
      req.params.id,
      { name, video },
      { new: true }
    );

    res.status(200).json({ message: "Video3 updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating video3", error: error.message });
  }
};

// Delete Video3
export const deleteVideo3 = async (req, res) => {
  try {
    const video = await Video3.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video3 not found" });
    }

    fs.unlink(video.video, (err) => {
      if (err) console.log("Failed to delete video3 file:", err);
    });

    await Video3.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video3 deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video3", error: error.message });
  }
};
