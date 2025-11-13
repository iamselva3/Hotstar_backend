// model/tv1Model.js
import mongoose from "mongoose";

const tv1Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TV1 = mongoose.model("TV1", tv1Schema);

export default TV1;
