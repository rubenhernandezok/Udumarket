import { supabase } from "../config/supabaseClient.js"

export const getProducts = async (req, res) => {

    console.log("USER TOKEN:", req.user)

    const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("business_id", req.user.business_id)

    if (error) return res.status(500).json(error)

    res.json(data)
}


export const createProduct = async (req, res) => {

    const { name, price, stock, category_id, unit_type, barcode, stock_min } = req.body

    const { data, error } = await supabase
        .from("products")
        .insert([
            {
                name,
                price,
                stock,
                category_id,
                unit_type,
                barcode,
                stock_min,
                business_id: req.user.business_id
            }
        ])
        .select()

    if (error) return res.status(500).json(error)

    res.json(data)
}


export const updateProduct = async (req, res) => {

    const { id } = req.params
    const { name, price, stock, category_id, unit_type, barcode, stock_min } = req.body

    const { data, error } = await supabase
        .from("products")
        .update({
            name,
            price,
            stock,
            category_id,
            unit_type,
            barcode,
            stock_min
        })
        .eq("id", id)
        .eq("business_id", req.user.business_id)
        .select()

    if (error) return res.status(500).json(error)

    res.json(data)
}


export const deleteProduct = async (req, res) => {

    const { id } = req.params

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .eq("business_id", req.user.business_id)

    if (error) return res.status(500).json(error)

    res.json({ message: "Producto eliminado" })
}

export const searchProducts = async (req, res) => {

    const { query } = req.query

    if (!query) {
        return res.json([])
    }

    const { data, error } = await supabase
        .from("products")
        .select("id, name, price, stock, unit_type")
        .eq("business_id", req.user.business_id)
        .ilike("name", `%${query}%`)
        .limit(10)

    if (error) {
        return res.status(500).json(error)
    }

    res.json(data)
}