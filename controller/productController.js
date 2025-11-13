// import Product from "../model/productModel.js";
// import fs from "fs";


// export const createProduct = async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     let image = req.file ? `/uploads/${req.file.filename}` : ""; // Save file path

//     // Check if product already exists
//     const productExist = await Product.findOne({ name });
//     if (productExist) {
//       return res.status(400).json({ message: "product already exists" });
//     }

//     // Create new product
//     const newProduct = new Product({ name, price, image });
//     const saveData = await newProduct.save();
    
//     res.status(200).json(saveData);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };


// // Get All Products
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching products", error });
//   }
// };



// export const getProductById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const productExist = await Product.findById(id);
//     if (!productExist) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(productExist);
//   } catch (error) {
//     res.status(500).json({ errorMessage: error.message });
//   }
// };


// // Update Product
// export const updateProduct = async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     let image = req.body.image;

//     if (req.file) {
//       image = req.file.path.replace(/\\/g, "/");
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { name, price, image },
//       { new: true }
//     );

//     res.status(200).json({ success: true, message: "Product updated!", updatedProduct });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error updating product", error });
//   }
// };

// // Delete Product
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     // Delete the image file
//     fs.unlink(product.image, (err) => {
//       if (err) console.log("Failed to delete image:", err);
//     });

//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ success: true, message: "Product deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting product", error });
//   }
// };

import Product from "../model/productModel.js";
import fs from "fs";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.file ? `/uploads/${req.file.filename}` : "";

    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product({ name, image });
    const saveData = await newProduct.save();

    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products", error });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = req.file.path.replace(/\\/g, "/");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Product updated!", updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product", error });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    fs.unlink(product.image, (err) => {
      if (err) console.log("Failed to delete image:", err);
    });

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product", error });
  }
};

