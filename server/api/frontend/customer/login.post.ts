import { useUsers } from "~/server/composables/useUsers"
import type {CustomerData,FrontendLogin} from "~/types"

export default defineEventHandler(async (event) => {
    const body:FrontendLogin = await readBody(event)

    const {login} = useUsers()
    const user:Partial<CustomerData> = await login(body)

    const config = useRuntimeConfig()

    user.tokenRenewUrl && setCookie(event, config.cookieName, user.tokenRenewUrl, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + parseInt(config.cookieExpires)),
      })

    return {user}
})