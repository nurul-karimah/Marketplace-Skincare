import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsCategori,
  getCategori, 
  updateStokProduct
} from "../controllers/ProdukController.js"

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/productsCategori", getProductsCategori);
router.get("/getCategori", getCategori);
router.put('/updateStok/:id', updateStokProduct);

export default router;
