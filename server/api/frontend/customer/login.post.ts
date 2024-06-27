import type {FrontendLogin} from "~/types"
import {useAuthentication} from "~/server/composables/useAuthentication"

export default defineEventHandler(async (event) => {
    const body:FrontendLogin = await readBody(event)

    const {login} = useAuthentication()
    const user = await login(body)

    const config = useRuntimeConfig()
    const session = serialize({ id: user.id })
    const signedSession = sign(session, config.cookieSecret)
    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + parseInt(config.cookieExpires)),
      })

    return user
})