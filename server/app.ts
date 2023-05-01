import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGODB_URI } from "./utils/config";
import slotsRouter from "./controllers/slotsController";
import balanceRouter from "./controllers/balanceController";
import loginRouter from "./controllers/loginControler";
import usersRouter from "./controllers/usersController";
import { errorHandler } from "./utils/errorHandler";
import { authMiddleware } from "./middleware/auth";

const app: Express = express();
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

  app.use(cors());
  app.use(express.static("build"));
  app.use(express.json());

  app.use("/api/users", usersRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/balance", authMiddleware, balanceRouter);
  app.use("/api/slots", authMiddleware, slotsRouter);

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Express server");
  });

  app.use(errorHandler);
}

export default app;
