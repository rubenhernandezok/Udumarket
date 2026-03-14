import bcrypt from "bcrypt"

const password = "admin123"

const hash = await bcrypt.hash(password, 10)

console.log(hash)

$2b$10$QA1.EY6FRTxwGEHyjE98aeismvAl8e1wNSUd0BGuom78WBwKgVNQW