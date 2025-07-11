import { NextFunction, Request, Response } from "express";
import { HttpError } from "../classes/httpError.js";
import { Unauthorized } from "../utils/errorHandler.js";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // http error
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  //   zod error
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "User error validation failed",
      details: err.errors,
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    throw new Unauthorized("Please login again, your sessing has expired.");
  }

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error.",
  });
};
