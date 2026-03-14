import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import saleRoutes from "./routes/saleRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "UduMarket API funcionando 🚀" })
})

app.use("/api/auth", authRoutes)

app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/sales", saleRoutes)
app.use("/api/dashboard", dashboardRoutes)

// rutas de prueba siempre al final

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})