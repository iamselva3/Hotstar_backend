import mongoose from "mongoose";

const video3Schema = new mongoose.Schema(
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

const Video3 = mongoose.model("Video3", video3Schema);

export default Video3;
