import express from "express";
import { create, getAllUsers, getUserById, update, deleteUser, getLoggedInUser } from "../controller/userController.js";

const route = express.Router();

// API Routes
route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

route.get("/user/profile", getLoggedInUser);

export default route;