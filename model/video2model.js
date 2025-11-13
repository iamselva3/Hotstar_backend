import mongoose from "mongoose";

const video2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Video2 = mongoose.model("Video2", video2Schema);

export default Video2;
