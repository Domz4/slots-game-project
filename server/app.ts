import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config";
import userRoutes from "./routes/userRoutes";
import { ErrorHandler } from "./utils/errorHandler";

const app: Express = express();

if (!MONGODB_URI) {
    throw new Error("Database error");
}

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

app.use(express.json());
app.use("/api/users", userRoutes); // Add user routes

app.use(
    (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).json({ error: err.message });
    }
);

app.get("/", (req: Request, res: Response) => {
    res.send("Express server");
});

export default app;
