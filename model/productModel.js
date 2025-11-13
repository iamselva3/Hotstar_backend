// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String, // Store file path
//     required: true,
//   },
// });

// const Product = mongoose.model("products", productSchema);
// export default Product;

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

const Product = mongoose.model("products", productSchema);
export default Product;
