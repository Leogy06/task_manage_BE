import { Router } from "express";
import {
  createTaskCategoryController,
  getCategoryListsController,
  getTasksCategoriesController,
} from "../controllers/taskCategoriesController.js";

const taskCategoriesRoutes = Router();

taskCategoriesRoutes.get("/", getTasksCategoriesController);

//create task category
taskCategoriesRoutes.post("/", createTaskCategoryController);

taskCategoriesRoutes.get("/get-lists/:categoryId", getCategoryListsController);

export default taskCategoriesRoutes;
