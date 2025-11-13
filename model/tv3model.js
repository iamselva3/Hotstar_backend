// model/tv3Model.js
import mongoose from "mongoose";

const tv3Schema = new mongoose.Schema(
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

const TV3 = mongoose.model("TV3", tv3Schema);

export default TV3;
