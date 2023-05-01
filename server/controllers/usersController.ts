import bcrypt from "bcrypt";
import User from "../models/User";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const { username, name, password, email } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "invalid password",
    });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return response.status(400).json({
      error: "username and email must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default usersRouter;
