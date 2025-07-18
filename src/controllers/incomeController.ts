import { NextFunction, Request, Response } from "express";
import {
  createIncomeService,
  getIncomeService,
  getUserTotalIncomeService,
} from "../services/incomeServices.js";
import { checkTokenValidityService } from "../services/auth.js";

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

export const getIncomeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUserId = checkTokenValidityService(req.cookies.token);

    const income = await getIncomeService(getUserId.decodedToken.userId);

    res.status(200).json(income);
  } catch (error) {
    next(error);
  }
};

//get user total income
export const getUserTotalIncomeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUserIdFromValidToken = checkTokenValidityService(
      req.cookies.token
    );

    const userTotalIncome = await getUserTotalIncomeService(
      getUserIdFromValidToken.decodedToken.userId
    );

    res.status(200).json({ totalIncome: userTotalIncome });
  } catch (error) {
    next(error);
  }
};
