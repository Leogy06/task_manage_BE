import { NextFunction, Request, Response } from "express";
import { NotFound } from "../utils/errorHandler.js";
import { JwtPayload, verify } from "jsonwebtoken";

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

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};
