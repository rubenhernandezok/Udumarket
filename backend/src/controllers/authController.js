import { supabase } from "../config/supabaseClient.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {

    const { email, password } = req.body

    console.log("EMAIL RECIBIDO:", email)

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single()

    if (error || !user) {
        return res.status(401).json({ error: "Usuario no encontrado" })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.status(401).json({ error: "Contraseña incorrecta" })
    }

    const token = jwt.sign(
        {
            user_id: user.id,
            business_id: user.business_id
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
    )

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            business_id: user.business_id
        }
    })
}