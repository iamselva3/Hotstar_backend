// model/sports2Model.js
import mongoose from "mongoose";

const sports2Schema = new mongoose.Schema(
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

const Sports2 = mongoose.model("Sports2", sports2Schema);

export default Sports2;
