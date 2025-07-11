import { verify } from "jsonwebtoken";
import { NotFound, ValidationError } from "../utils/errorHandler.js";
import "../config/environment.js";

type UserTypes = {
  username: string;
  password: string;
};

export const loginService = ({ username, password }: UserTypes) => {
  if (!username || !password) {
    return { message: " Required fields are empty." };
  }
};

export const checkUserValidity = (token: string) => {
  if (!token) throw new NotFound("Token not found. Please login again.");

  const decodedToken = verify(token, process.env.JWT_SECRET as string);

  if (
    !decodedToken ||
    typeof decodedToken !== "object" ||
    !("username" in decodedToken)
  ) {
    throw new ValidationError("Invalid token, please login again.");
  }

  return decodedToken;
};
