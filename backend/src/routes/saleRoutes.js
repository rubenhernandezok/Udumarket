import express from "express"

import { createSale } from "../controllers/saleController.js"

import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", verifyToken, createSale)

export default router