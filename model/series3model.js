// model/series3Model.js
import mongoose from "mongoose";

const series3Schema = new mongoose.Schema(
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

const Series3 = mongoose.model("Series3", series3Schema);

export default Series3;
