import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../utils/config";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, SESSION_SECRET) as { id: string; username: string };
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "Access denied, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
