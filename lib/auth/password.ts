import bcrypt from "bcryptjs"
export async function hashPassword(password:string){
    return bcrypt.hash(password,12)
}
export async function VerifyPassword(password:string, passwordHash:string){
    return bcrypt.compare(password, passwordHash)
}