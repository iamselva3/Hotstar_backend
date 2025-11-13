import mongoose from "mongoose";

const video1Schema = new mongoose.Schema(
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

const Video1 = mongoose.model("Video1", video1Schema);

export default Video1;
