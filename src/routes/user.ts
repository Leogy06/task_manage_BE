import { Router } from "express";
import {
  checkUserController,
  checkUsername,
  createUser,
  loggingInUser,
  loggingOutUser,
} from "../controllers/user.js";

const userRoutes = Router();

//create new user
userRoutes.post("/", createUser);

//check username availability
// * this is for creat new account
userRoutes.get("/check-username/:username", checkUsername);

//login user
userRoutes.post("/login", loggingInUser);

//logout user
userRoutes.post("/logout", loggingOutUser);

//check user
userRoutes.get("/auth/check", checkUserController);

export default userRoutes;
