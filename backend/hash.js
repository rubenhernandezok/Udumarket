import bcrypt from "bcrypt"

const password = "ppappa"

const hash = await bcrypt.hash(password, 10)

console.log(hash)
