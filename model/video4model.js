import mongoose from "mongoose";

const video4Schema = new mongoose.Schema(
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

const Video4 = mongoose.model("Video4", video4Schema);

export default Video4;
