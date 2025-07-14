import { Router } from "express";
import { createIncomeController } from "../controllers/incomeController.js";

const incomeRoutes = Router();

incomeRoutes.post("/create", createIncomeController);

export default incomeRoutes;
