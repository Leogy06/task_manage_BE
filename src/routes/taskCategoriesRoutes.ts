import { Router } from "express";
import { getTasksCategoriesController } from "../controllers/taskCategoriesController.js";

const taskCategoriesRoutes = Router();

taskCategoriesRoutes.get("/", getTasksCategoriesController);

export default taskCategoriesRoutes;
