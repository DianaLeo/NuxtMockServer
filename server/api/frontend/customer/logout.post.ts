import type {FrontendLogin} from "~/types"
import {useAuthentication} from "~/server/composables/useAuthentication"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })

    return null
})