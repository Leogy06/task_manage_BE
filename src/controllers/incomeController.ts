import { NextFunction, Request, Response } from "express";
import { createIncomeService } from "../services/incomeServices.js";

export const createIncomeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createIncomeService(req.body);

    res.status(201).send("New Income has been created.");
  } catch (error) {
    next(error);
  }
};
