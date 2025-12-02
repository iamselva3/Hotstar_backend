import express from "express";
import { create, getAllUsers, getUserById, update, deleteUser, getLoggedInUser, login } from "../controller/userController.js";
import { verifyToken } from "../middleware/authUser.js";

const route = express.Router();

// API Routes
route.post("/user", create);
route.post("/login", login); // Login route

// Protected Routes
route.get("/users", verifyToken, getAllUsers);
route.get("/user/:id", verifyToken, getUserById);
route.put("/update/user/:id", verifyToken, update);
route.delete("/delete/user/:id", verifyToken, deleteUser);

route.get("/user/profile", verifyToken, getLoggedInUser);

export default route;