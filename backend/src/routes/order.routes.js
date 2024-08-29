//routes import
import { add, cancel, deleteOrder, getAll, getUserOrder, status } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

import express from "express";
const router = express.Router();

router.route("/add").post(authenticate,add) 
router.route("/delete").post(authenticate,deleteOrder)
router.route("/updateStatus").post(authenticate,status)
router.route("/cancel").post(authenticate,cancel)
router.route("/getAll").get(authenticate,getAll)
router.route("/getUserOrder").get(authenticate,getUserOrder)


export default router;
