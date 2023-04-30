import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SESSION_SECRET } from "../utils/config";
import User from "../models/User";
import { Router } from "express";

const loginRouter = Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SESSION_SECRET);

  response.status(200).send({ token, username: user.username, name: user.name });
});

export default loginRouter;
