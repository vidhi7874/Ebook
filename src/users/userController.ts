import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //validation
  //get what user requested or posted from req.body then validate it .
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All the fields are required.");
    return next(error);
  }

  //database call
  const user = await userModel.findOne({ email });
  if (user) {
    const error = createHttpError(400, "User already exists");
    return next(error);
  }

  res.json({ message: "User Created" });
};
export { createUser };
