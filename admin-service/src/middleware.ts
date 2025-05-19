import axios from "axios";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();
interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  playlist: string[];
}

interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}
export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.token as string;
    if (!token) {
      res.status(403).json({ message: "Please login first" });
      return;
    }
    const { data } = await axios.get(`${process.env.USER_URI}/api/v1/user/me`, {
      headers: { token },
    });
    req.user = data;
    next();
  } catch (error) {
    res.status(403).json({ message: "Please login first" });
  }
};
