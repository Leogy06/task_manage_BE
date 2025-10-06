import { NextFunction, Request, Response } from "express";
import {
  createTaskCategoryService,
  getTraskCategoryServices,
} from "../services/taskCategoryServices.js";
import { NewRequest } from "../types/request.js";

export const getTasksCategoriesController = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getTraskCategoryServices(req.user?.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createTaskCategoryController = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await createTaskCategoryService(
      req.user?.id,
      req.body.description
    );

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
