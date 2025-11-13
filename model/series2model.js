// model/series2Model.js
import mongoose from "mongoose";

const series2Schema = new mongoose.Schema(
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

const Series2 = mongoose.model("Series2", series2Schema);

export default Series2;
