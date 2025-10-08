import { Router } from "express";
import {
  createTaskCategoryController,
  createTaskController,
  editTaskStatusController,
  getTasksCategoriesController,
  getTasksController,
} from "../controllers/taskCategoriesController.js";

const taskCategoriesRoutes = Router();

//task category
taskCategoriesRoutes.get("/", getTasksCategoriesController);

//create task category
taskCategoriesRoutes.post("/", createTaskCategoryController);

//tasks api
taskCategoriesRoutes.post("/create-task", createTaskController);

taskCategoriesRoutes.get("/get-task/:categoryId", getTasksController);

// ? modify task status
taskCategoriesRoutes.put("/modify/task-status", editTaskStatusController);

export default taskCategoriesRoutes;
