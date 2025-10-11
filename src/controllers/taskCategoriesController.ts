import { NextFunction, Request, Response } from "express";
import {
  archiveTaskCategoryService,
  createTaskCategoryService,
  createTaskService,
  editTaskStatusService,
  getCategoryListService,
  getTraskCategoryServices,
} from "../services/taskCategoryServices.js";
import { NewRequest } from "../types/request.js";

// * task-category controllers
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

//archive task catgegory
export const archiveTaskCategoryController = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await archiveTaskCategoryService(
      req.user?.id,
      req.body.taskCategoryId
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// * tasks controllers
export const getTasksController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryLists = await getCategoryListService(req.params.categoryId);

    res.status(200).json(categoryLists);
  } catch (error) {
    next(error);
  }
};

export const createTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTask = await createTaskService(req.body);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

//modify task status
export const editTaskStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTask = await editTaskStatusService(req.body);

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};
