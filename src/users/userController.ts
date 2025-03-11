import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs";

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

  //after chechking all the validation store the user in DB
  //we cannot store user's password as it is in DB so we need to hash it.
  const hashedPassword = await bcrypt.hashSync(password, 10);

  //store the user in DB
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({ id: newUser._id });
};
export { createUser };
