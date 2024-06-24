import type {Login, User} from "~/types"

export const useUsers = () => {
    let user: User

    const login = async ({email, password}:Login):Promise<void> => {
        try {
            const response = await fetch('http://localhost:8080/users')
            user = await response.json()
        } catch (error) {
            console.error('Error fetching users:', error)
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
        users,
        login,
        signup,
    }
}
