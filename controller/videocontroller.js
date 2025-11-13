import fs from "fs";
import Video from "../model/videomodel.js";

// Upload Video (Create)
export const uploadVideo = async (req, res) => {
  try {
    const { name } = req.body;
    let video = req.file ? `/uploads/videos/${req.file.filename}` : "";

    const videoExist = await Video.findOne({ name });
    if (videoExist) {
      return res.status(400).json({ message: "Video already exists" });
    }

    const newVideo = new Video({ name, video });
    const savedVideo = await newVideo.save();

    res.status(200).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: "Error uploading video", error: error.message });
  }
};

// Get All Videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};

// Get Video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error fetching video", error: error.message });
  }
};

// Update Video
export const updateVideo = async (req, res) => {
  try {
    const { name } = req.body;
    let video = req.body.video;

    if (req.file) {
      video = `/uploads/videos/${req.file.filename}`;
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { name, video },
      { new: true }
    );

    res.status(200).json({ message: "Video updated", updatedVideo });
  } catch (error) {
    res.status(500).json({ message: "Error updating video", error: error.message });
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete video file from filesystem
    fs.unlink(video.video, (err) => {
      if (err) console.log("Failed to delete video file:", err);
    });

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video", error: error.message });
  }
};
