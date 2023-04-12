import User from "../models/User";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";
import { ErrorHandler } from "../utils/errorHandler";
import { IUserInput } from "../types/types";

export const registerUserService = async (userData: IUserInput) => {
    const user = new User(userData);
    await user.save();
    return user;
};

export const loginUserService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ErrorHandler(401, "Invalid email or password");
    }

    const correctPassword = await user.comparePassword(password);
    if (!correctPassword) {
        throw new ErrorHandler(401, "Invalid email or password");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
