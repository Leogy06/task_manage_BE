import { NextFunction, Request, Response } from "express";
import { checkTokenValidityService, loginService } from "../services/auth.js";
import { generateToken } from "../utils/token.js";

//import dotenv
import "../config/environment.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginResult = await loginService(req.body);

    const token = generateToken(String(loginResult.id));

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).send(loginResult);
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
