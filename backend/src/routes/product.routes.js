//routes import
import upload from "../middlewares/multer.middleware.js";
import { addProduct, addToCart, deleteProduct, getCartDetails, getOneProduct, getProducts, removeFromCart, search } from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

import express from "express";
const router = express.Router();

router.route("/add").post(authenticate,upload.single("image"), addProduct);
router.route("/delete").post (authenticate, deleteProduct)
router.route("/getAll").get(authenticate, getProducts)
router.route("/get/:id").get(authenticate, getOneProduct)
router.route("/addToCart").post(authenticate, addToCart )
router.route("/removeFromCart").post(authenticate, removeFromCart)
router.route("/getCartDetails").get(authenticate, getCartDetails)
router.route("/search").get(authenticate, search)

export default router;
