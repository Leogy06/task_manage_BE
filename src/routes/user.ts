import { Router } from "express";
import {
  checkUsername,
  createUser,
  loggingInUser,
  loggingOutUser,
} from "../controllers/user.js";

const userRoutes = Router();

//create new user
userRoutes.post("/", createUser);

//check username availability
userRoutes.get("/check-username/:username", checkUsername);

//login user
userRoutes.post("/login", loggingInUser);

//logout user
userRoutes.post("/logout", loggingOutUser);

//check user

export default userRoutes;
