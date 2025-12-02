import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "./hashpass.js";

// Login user
export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;// Expecting 'password' from client, but checking against 'password' in DB

    const userExist = await User.findOne({ name });

    console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password (stored in 'password' field)

    const isMatch = await comparePassword(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, user: userExist });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Create a new user
export const create = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({
      $or: [{ email }, { name }]
    });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordhash = await hashPassword(password);

    // Create new user
    const newUser = new User({ name, email, password: passwordhash });
    const saveData = await newUser.save();

    res.status(200).json(saveData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update user
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use your JWT secret
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};