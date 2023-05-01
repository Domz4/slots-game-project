import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";

type errorHandler = (
  error: Error | jwt.JsonWebTokenError,
  request: Request,
  response: Response,
  next: NextFunction
) => void;

export const errorHandler: errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  next(error);
};
