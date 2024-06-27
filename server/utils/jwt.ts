import jwt, {JwtPayload} from "jsonwebtoken"

const secret = process.env.JWT_SECRET || "defaultSecret"

type Payload = {
    id:string
}

export function generateToken (payload:Payload) {
    return jwt.sign(payload, secret, {expiresIn: process.env.JWT_EXPIRES || "1d"})
}

export function validateToken (token:string) {
    try {
        return jwt.verify(token, secret)
    }catch (e) {
        console.log("validateToken error = ",e)
        return undefined
    }
}