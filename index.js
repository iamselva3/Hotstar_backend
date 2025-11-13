import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import Product from "./model/productModel.js";
import router from "./routes/productRoute.js";
import routemovie from "./routes/movieRoute.js";
import routeGBM from "./routes/gbmRoutes.js";
import routeTV1 from "./routes/tv1route.js";
import routeTV2 from "./routes/tv2route.js";
import routeTV3 from "./routes/tv3route.js";
import routeSports1 from "./routes/sports1route.js";
import routeSports2 from "./routes/sports2route.js";
import routeSports3 from "./routes/sports3route.js";
import routeSports4 from "./routes/sports4route.js";
import routeSeries1 from "./routes/series1routes.js";
import routeSeries2 from "./routes/series2route.js";
import routeSeries3 from "./routes/series3route.js";
import routeSeries4 from "./routes/series4route.js";
import routeMovie1 from "./routes/movie1route.js";
import routeMovie2 from "./routes/movie2route.js";
import routeMovie3 from "./routes/movie3route.js";
import routeMovie4 from "./routes/movie4route.js";
import routervideo from "./routes/videoroute.js";
import routervideo1 from "./routes/video1route.js";
import routervideo2 from "./routes/video2route.js";
import routervideo3 from "./routes/video3route.js";
import routervideo4 from "./routes/video4route.js";


const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Updated API: Admin can edit only name and image (NO price)
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    let image = req.body.image; // Keep existing image if not updating

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// MongoDB Connection
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
mongoose.connect(MONGOURL)
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use("/api", route);       // User routes
app.use("/api", router);      // Product routes
app.use("/api", routemovie);  // Movie routes
app.use("/api", routeGBM);    //gbm rotes
app.use("/api",routeTV1);
app.use("/api",routeTV2);
app.use("/api",routeTV3);
app.use("/api",routeSports1);
app.use("/api",routeSports2);
app.use("/api",routeSports3);
app.use("/api",routeSports4);
app.use("/api",routeSeries1);
app.use("/api",routeSeries2);
app.use("/api",routeSeries3);
app.use("/api",routeSeries4);
app.use("/api",routeMovie1);
app.use("/api",routeMovie2);
app.use("/api",routeMovie3);
app.use("/api",routeMovie4);
app.use("/api",routervideo);
app.use("/api",routervideo1);
app.use("/api",routervideo2);
app.use("/api",routervideo3);
app.use("/api",routervideo4);