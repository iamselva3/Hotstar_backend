import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use env variable in production
        req.user = await User.findById(decoded.id).select("-address"); // Exclude password field

        if (!req.user) {
            return res.status(401).json({ message: "Invalid Token. User not found." });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token", error: error.message });
    }
};
