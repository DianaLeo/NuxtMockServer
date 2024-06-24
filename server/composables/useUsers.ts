import type {Login, User} from "~/types"
import { serialize,sign } from "../utils/cookie"

export const useUsers = () => {
    let user: User|undefined

    const login = async ({email, password}:Login):Promise<{user:Partial<User>,signedSession:string}> => {
        if (!email || !password) {
            throw createError({
              statusCode: 400,
              message: "Email address and password are required",
            })
        }
        try {
            const response = await fetch('http://localhost:8080/users')
            if (!response.ok) {
                throw createError({
                  statusCode: response.status,
                  message: "Error fetching users",
                })
              }
            const users:User[] = await response.json()
            user = users.find((user:User)=>user.email===email)
            if (!user) {
                throw createError({
                  statusCode: 401,
                  message: "Invalid email",
                })
            }
            // TODO: verify password
            if (user.password !== password) {
                throw createError({
                  statusCode: 401,
                  message: "Invalid password",
                })
            }
            const {password:_password, ...userWithoutPassword} = user

            const config = useRuntimeConfig()
            const session = serialize({userId:user.customerId})
            console.log("session=",session)
            const signedSession = sign(session,config.cookieSecret)
            return {
                user:userWithoutPassword,
                signedSession
            }
{}        } catch (error) {
            console.error('Error fetching users:', error)
            throw createError({
                statusCode: 500,
                message: "Internal server error",
              })
        }
    }

    const signup = async (user:User) => {
        try {
            const response = await fetch('http://localhost:8080/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                throw new Error('Failed to post user')
            }
            const newUser = await response.json()
            console.log("newUser posted", newUser)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    return {
        login,
        signup,
    }
}
