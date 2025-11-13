// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/productController.js";

// // import { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } from "../controller/productController.js";

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer Storage for Product Images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Routes
// router.post("/product_details", upload.single("image"), createProduct);
// router.get("/products", getAllProducts);
// router.get("/product/:id",getProductById);
// router.put("/update/product/:id", upload.single("image"), updateProduct);
// router.delete("/delete/product/:id", deleteProduct);

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Product Routes
router.post("/product_details", upload.single("image"), createProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/update/product/:id", upload.single("image"), updateProduct);
router.delete("/delete/product/:id", deleteProduct);

export default router;
