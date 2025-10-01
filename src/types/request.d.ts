import { Request } from "express";
import { CreateUserInput } from "../validations/userSchema.ts";

export interface RequestUserType extends Omit<CreateUserInput, "password"> {}

export interface NewRequest extends Request {
  user?: RequestUserType;
}
