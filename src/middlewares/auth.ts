import { NextFunction, Request, Response } from "express";
import { NotFound } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

// config
import "../config/environment.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new NotFound("Token Not found, Please login again.");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
