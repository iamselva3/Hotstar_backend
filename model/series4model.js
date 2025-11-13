// model/series4Model.js
import mongoose from "mongoose";

const series4Schema = new mongoose.Schema(
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

const Series4 = mongoose.model("Series4", series4Schema);

export default Series4;
