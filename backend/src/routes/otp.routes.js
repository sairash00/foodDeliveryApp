//routes import

import { otp } from "../controllers/otp.controller.js";

import express from "express";
const router = express.Router();

router.route("/send").post(otp)

export default router;
 