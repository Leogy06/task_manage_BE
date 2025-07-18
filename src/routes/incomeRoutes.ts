import { Router } from "express";
import {
  createIncomeController,
  getIncomeController,
  getUserTotalIncomeController,
} from "../controllers/incomeController.js";

const incomeRoutes = Router();

incomeRoutes.post("/create", createIncomeController);

//get income by user id
incomeRoutes.get("/get", getIncomeController);

//get total income user
incomeRoutes.get("/user-total-income", getUserTotalIncomeController);

export default incomeRoutes;
