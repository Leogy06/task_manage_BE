import { Router } from "express";
import {
  checkUsername,
  createUser,
  loggingInUser,
} from "../controllers/user.js";

const userRoutes = Router();

//create new user
userRoutes.post("/", createUser);

//check username availability
userRoutes.get("/check-username/:username", checkUsername);

//login user
userRoutes.post("/login", loggingInUser);

export default userRoutes;
