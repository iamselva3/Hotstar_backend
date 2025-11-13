// model/movie4Model.js
import mongoose from "mongoose";

const movie4Schema = new mongoose.Schema(
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

const Movie4 = mongoose.model("Movie4", movie4Schema);

export default Movie4;
