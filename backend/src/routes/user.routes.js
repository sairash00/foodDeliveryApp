//routes import

import { getUser, isLoggedIn, login,  logout,  register } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

import express from "express";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/get").get(authenticate,getUser)
router.route("/logout").get(authenticate,logout)
router.route("/isLoggedIn").get(isLoggedIn)

export default router;
 