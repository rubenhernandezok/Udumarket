import { supabase } from "../config/supabaseClient.js"
import bcrypt from "bcrypt"

async function createBusiness() {

    const businessName = process.argv[2]
    const email = process.argv[3]
    const password = process.argv[4]

    if(!businessName || !email || !password){
        console.log("Uso:")
        console.log("node scripts/createBusiness.js 'Nombre Negocio' email password")
        process.exit()
    }

    try {

        const { data: business, error: businessError } = await supabase
            .from("businesses")
            .insert([{ name: businessName }])
            .select()
            .single()

        if(businessError) throw businessError

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

        if(userError) throw userError

        console.log("✅ Cliente creado")
        console.log("Negocio:", businessName)
        console.log("Email:", email)
        console.log("Password:", password)

    } catch(error){

        console.error("Error:", error)

    }

}

createBusiness()