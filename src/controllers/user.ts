import { NextFunction, Request, Response } from "express";
import {
  checkUsernameService,
  checkUserService,
  createUserService,
  userLogin,
} from "../services/user.js";

// env
import "../config/environment.js";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    next(error);
  }
};

// ? avoids username duplication in forms
//validation for username availability
export const checkUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const result = await checkUsernameService(username);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//logging user
export const loggingInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await userLogin(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000, //1h
    });
    res.status(200).json({
      message: "Login Successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// ? logout user
export const loggingOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });

    res.status(200).json({ message: "User logged out successfully." });
  } catch (error) {
    next(error);
  }
};

// * check user if login still valid
export const checkUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  try {
    const decoded = checkUserService(token);

    res.status(200).json(decoded);
  } catch (error) {
    next(error);
  }
};
