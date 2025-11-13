import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store file path
    required: true,
  },
});

const Movie = mongoose.model("movies", productSchema);
export default Movie;
