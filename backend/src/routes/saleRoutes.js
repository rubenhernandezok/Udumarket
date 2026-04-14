import express from "express"

import { createSale, getSales } from "../controllers/saleController.js"

import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", verifyToken, createSale)

router.get("/",verifyToken, getSales)

export default router