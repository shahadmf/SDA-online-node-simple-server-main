import { Router } from "express";
import {
  addProduct,
  getAllProducts,
} from "../controller/productController.js";

const router = Router();

router.get("/products", getAllProducts);

router.post("/products", addProduct);

export default router;
