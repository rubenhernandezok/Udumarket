import express from "express"

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController.js"

import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// obtener productos del negocio
router.get("/", verifyToken, getProducts)

// buscar productos
router.get("/search", verifyToken, searchProducts)

// crear producto
router.post("/", verifyToken, createProduct)

// actualizar producto
router.put("/:id", verifyToken, updateProduct)

// eliminar producto
router.delete("/:id", verifyToken, deleteProduct)

export default router