import jwt from "jsonwebtoken"

export function generateToken (payload:{id:string}) {
    const secret = process.env.JWT_SECRET || "defaultSecret"
    return jwt.sign(payload, secret, {expiresIn: process.env.JWT_EXPIRES || "1d"})
}