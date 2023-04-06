import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json({ token });
};
