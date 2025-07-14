import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/userServices.js";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    log;
    await createUserService(req.body);

    res.status(201).send("User has been created successfully!");
  } catch (error) {
    next(error);
  }
};
