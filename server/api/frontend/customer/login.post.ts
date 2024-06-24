import { useUsers } from "~/server/composables/useUsers"
import type {Login} from "~/types"

export default defineEventHandler(async (event) => {
    let user = {}
    const body:Login = await readBody(event)
    const {login} = useUsers()
    user = await login(body)
    return {body}
})