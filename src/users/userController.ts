import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { access } from "fs";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //validation
  //get what user requested or posted from req.body then validate it .
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All the fields are required.");
    return next(error);
  }

  //database call

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  //after chechking all the validation store the user in DB
  //we cannot store user's password as it is in DB so we need to hash it.
  const hashedPassword = await bcrypt.hashSync(password, 10);

  //store the user in DB
  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }

  //with token we send payload to user and another parameter is secret key
  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing the JWT token"));
  }
};
export { createUser };
