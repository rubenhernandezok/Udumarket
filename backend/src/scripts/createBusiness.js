import { supabase } from "../config/supabaseClient.js"
import bcrypt from "bcrypt"

async function createBusiness() {

  const businessName = process.argv[2]
  const email = process.argv[3]
  const password = process.argv[4]

  if (!businessName || !email || !password) {
    console.log("Uso:")
    console.log("node scripts/createBusiness.js 'Nombre Negocio' email password")
    process.exit()
  }

  try {

    // =========================
    // 🏢 CREAR NEGOCIO
    // =========================
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .insert([{
        name: businessName,
        timezone: "America/Argentina/Buenos_Aires" // 🔥 CLAVE
      }])
      .select()
      .single()

    if (businessError) throw businessError

    // =========================
    // 👤 CREAR USUARIO
    // =========================
    const hashedPassword = await bcrypt.hash(password, 10)

    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([{
        email,
        password: hashedPassword,
        business_id: business.id
      }])
      .select()
      .single()

    if (userError) throw userError

    // =========================
    // 📦 DATOS INICIALES (IMPORTANTE)
    // =========================

    // categorías base
    await supabase.from("categories").insert([
      { name: "General", business_id: business.id }
    ])

    // productos demo (opcional)
    await supabase.from("products").insert([
      {
        name: "Producto de prueba",
        price: 1000,
        stock: 10,
        business_id: business.id
      }
    ])

    console.log("✅ Cliente creado correctamente")
    console.log("Negocio:", businessName)
    console.log("Email:", email)

  } catch (error) {
    console.error("❌ Error:", error)
  }

}

createBusiness()