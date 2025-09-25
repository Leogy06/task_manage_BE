import { Router } from "express";
import { createUser } from "../controllers/user.js";

const userRoutes = Router();

userRoutes.post("/", createUser);

export default userRoutes;
