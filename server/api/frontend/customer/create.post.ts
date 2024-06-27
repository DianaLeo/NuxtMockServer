import type {CustomerAccountResponse, FrontendRegistration} from "~/types"
import {useAuthentication} from "~/server/composables/useAuthentication"

export default defineEventHandler(async (event) => {
    const body:FrontendRegistration = await readBody(event)

    const { signup } = useAuthentication()

    const response: CustomerAccountResponse = await signup(body)
    return response
})