// model/movie2Model.js
import mongoose from "mongoose";

const movie2Schema = new mongoose.Schema(
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

const Movie2 = mongoose.model("Movie2", movie2Schema);

export default Movie2;
