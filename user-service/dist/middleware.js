import jwt from "jsonwebtoken";
import { User } from "./model.js";
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({ message: "Please login first" });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedValue || !decodedValue._id) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        const userId = decodedValue._id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Please login first" });
    }
};
