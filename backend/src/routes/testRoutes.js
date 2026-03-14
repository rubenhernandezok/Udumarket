/*
import express from "express"
import { supabase } from "../config/supabaseClient.js"

const router = express.Router()

router.get("/products", async (req, res) => {

    const { data, error } = await supabase
        .from("products")
        .select("*")

    if (error) {
        return res.status(500).json(error)
    }

    res.json(data)

})

export default router
*/