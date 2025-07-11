import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error("Unable to login. ", error);
    res.status(500).json({ message: "Unable to login.", error });
  }
};
