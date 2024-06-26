import type {CustomerAccountResponse, FrontendRegistration} from "~/types"
import {useUsers} from "~/server/composables/useUsers"

export default defineEventHandler(async (event) => {
    const body:FrontendRegistration = await readBody(event)

    const { signup } = useUsers()

    const response: CustomerAccountResponse = await signup(body)
    return response
})