import { supabase } from "../config/supabaseClient.js"

export const getCategories = async (req, res) => {

    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("business_id", req.user.business_id)

    if (error) return res.status(500).json(error)

    res.json(data)

}


export const createCategory = async (req, res) => {

    const { name } = req.body

    const { data, error } = await supabase
        .from("categories")
        .insert([
            {
                name,
                business_id: req.user.business_id
            }
        ])
        .select()

    if (error) return res.status(500).json(error)

    res.json(data)

}


export const updateCategory = async (req, res) => {

    const { id } = req.params
    const { name } = req.body

    const { data, error } = await supabase
        .from("categories")
        .update({ name })
        .eq("id", id)
        .eq("business_id", req.user.business_id)
        .select()

    if (error) return res.status(500).json(error)

    res.json(data)

}


export const deleteCategory = async (req, res) => {

    const { id } = req.params

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)
        .eq("business_id", req.user.business_id)

    if (error) return res.status(500).json(error)

    res.json({ message: "Categoría eliminada" })

}