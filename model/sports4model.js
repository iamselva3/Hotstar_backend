// model/sports4Model.js
import mongoose from "mongoose";

const sports4Schema = new mongoose.Schema(
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

const Sports4 = mongoose.model("Sports4", sports4Schema);

export default Sports4;
