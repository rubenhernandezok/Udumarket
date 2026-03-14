import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

const envPath = process.env.DOTENV_CONFIG_PATH
  ? process.env.DOTENV_CONFIG_PATH
  : fs.existsSync(path.resolve(process.cwd(), ".env.local"))
    ? ".env.local"
    : ".env"

dotenv.config({ path: envPath })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
