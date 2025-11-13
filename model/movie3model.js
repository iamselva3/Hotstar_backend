// model/movie3Model.js
import mongoose from "mongoose";

const movie3Schema = new mongoose.Schema(
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

const Movie3 = mongoose.model("Movie3", movie3Schema);

export default Movie3;
