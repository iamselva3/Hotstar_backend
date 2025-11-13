// model/sports3Model.js
import mongoose from "mongoose";

const sports3Schema = new mongoose.Schema(
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

const Sports3 = mongoose.model("Sports3", sports3Schema);

export default Sports3;
