// model/sports1Model.js
import mongoose from "mongoose";

const sports1Schema = new mongoose.Schema(
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

const Sports1 = mongoose.model("Sports1", sports1Schema);

export default Sports1;
