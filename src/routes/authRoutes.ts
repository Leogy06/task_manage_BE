import { Router } from "express";
import { checkTokenValidityController, login } from "../controllers/auth.js";

const authRoutes = Router();

//login
authRoutes.post("/login", login);

//check if expired
authRoutes.get("/checkValidity", checkTokenValidityController);

export default authRoutes;
