import express from "express";
import * as userController from "../controller/userController";

const router = express.Router();

router.get("/", userController.getAuthUser);

router.post("/signup", userController.SignUp);

router.post("/login", userController.LogIn);

router.get("/logout", userController.Logout);
export default router;
