// model/series1Model.js
import mongoose from "mongoose";

const series1Schema = new mongoose.Schema(
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

const Series1 = mongoose.model("Series1", series1Schema);

export default Series1;
