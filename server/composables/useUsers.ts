import type {Login, User} from "~/types"

export const useUsers = () => {
    const login = async ({email, password}:Login):Promise<{user:Partial<User>,signedSession:string}> => {
        let users:User[]

        if (!email || !password) {
            throw BadRequestError("Email address and password are required")
        }

        try{
            users = await $fetch('http://localhost:8080/users')
        }catch (e){
            throw InternalError("Internal error fetching users")
        }

        const user:User|undefined = users.find((user:User)=>user.email===email)
        if (!user) {
            throw UnauthorizedError("User not found")
        }
        // TODO: verify password
        if (user.password !== password) {
            throw UnauthorizedError("Invalid password")
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
