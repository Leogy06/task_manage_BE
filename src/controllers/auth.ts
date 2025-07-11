import { NextFunction, Request, Response } from "express";
import { checkTokenValidityService } from "../services/auth.js";

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const checkTokenValidityController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if token is valid
    const isTokenValid = checkTokenValidityService(req.cookies.token);

    res.status(200).json({
      message: "User logged in.",
      loggedIn: isTokenValid.loggedIn,
    });
  } catch (error) {
    next(error);
  }
};
