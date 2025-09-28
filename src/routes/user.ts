import { Router } from "express";
import { checkUsername, createUser } from "../controllers/user.js";

const userRoutes = Router();

//create new user
userRoutes.post("/", createUser);

//check username availability
userRoutes.get("/check-username/:username", checkUsername);

export default userRoutes;
