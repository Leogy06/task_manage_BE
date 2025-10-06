import { Router } from "express";
import {
  createTaskCategoryController,
  getTasksCategoriesController,
} from "../controllers/taskCategoriesController.js";

const taskCategoriesRoutes = Router();

taskCategoriesRoutes.get("/", getTasksCategoriesController);

//create task category
taskCategoriesRoutes.post("/", createTaskCategoryController);

export default taskCategoriesRoutes;
