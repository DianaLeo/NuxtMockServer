import { useUsers } from "~/server/composables/useUsers"
import type {User,Login} from "~/types"

export default defineEventHandler(async (event) => {
    const body:Login = await readBody(event)

    const {login} = useUsers()
    const {user, signedSession} = await login(body)
    
    const config = useRuntimeConfig()
    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + parseInt(config.cookieExpires)),
      })

    return {user}
})