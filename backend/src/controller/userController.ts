import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthUser: RequestHandler = async (req, res, next) => {
  const authuser = req.session.userId;

  try {
    if (!authuser) {
      throw createHttpError(401, "user not authenticated");
    }
    console.log(authuser);
    const user = await UserModel.findById(authuser).select("+email").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const SignUp: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    //full info validation
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "paramerters missing");
    }

    //username uniqueness validation
    const existingUsername = await UserModel.findOne({
      userName: username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "username is already taken, please choose a diffrenet one or log in instead"
      );
    }

    // email uniqueness validation
    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "email is already taken, please choose a diffrenet one or log in instead"
      );
    }

    //hashing password
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    //creating new user on DB
    console.log(passwordHash);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    console.log(newUser);
    req.session.userId = newUser._id;
    //returning the new created user
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const LogIn: RequestHandler = async (req, res, next) => {
  //   console.log(req.sessionID);
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      throw createHttpError(400, "parameters missing");
    }
    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    req.session.userId = user._id;
    // console.log(req.session.userId);
    console.log(user);
    res.send(req.session.userId);
  } catch (error) {
    next(error);
  }
};

export const Logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
