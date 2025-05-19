import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({ message: "Please login first" });
            return;
        }
        const { data } = await axios.get(`${process.env.USER_URI}/api/v1/user/me`, {
            headers: { token },
        });
        req.user = data;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Please login first" });
    }
};
