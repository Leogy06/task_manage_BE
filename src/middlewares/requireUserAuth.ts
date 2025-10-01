import { NextFunction, Response } from "express";
import { requireUserAuthService } from "../services/user.js";

import { NewRequest } from "../types/request.js";

const requireUserAuthMiddleWare = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await requireUserAuthService(req.cookies.token);

    req.user = response.user;

    next();
  } catch (error) {
    next(error);
  }
};

export default requireUserAuthMiddleWare;
