import { NextFunction, Request, Response } from "express";
import { checkUsernameService, createUserService } from "../services/user.js";

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
