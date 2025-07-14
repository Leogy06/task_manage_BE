import jwt from "jsonwebtoken";
import "../config/environment.js";
import { UserTypes } from "../types/user.js";

export const generateToken = (userId: UserTypes["id"]) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
