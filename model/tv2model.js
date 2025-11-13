// model/tv2Model.js
import mongoose from "mongoose";

const tv2Schema = new mongoose.Schema(
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

const TV2 = mongoose.model("TV2", tv2Schema);

export default TV2;
