import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  const user = await registerUserService(req.body);
  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginUserService(email, password);
  res.json({ token });
};
