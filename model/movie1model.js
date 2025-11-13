// model/movie1Model.js
import mongoose from "mongoose";

const movie1Schema = new mongoose.Schema(
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

const Movie1 = mongoose.model("Movie1", movie1Schema);

export default Movie1;
