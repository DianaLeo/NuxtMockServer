import {JwtPayload} from "jsonwebtoken"

export default defineEventHandler(async (event) => {
    if (event.path.startsWith("/api/frontend/customer") || event.path === "/") return

    console.log("Checking authentication...")

/*    const user = await getUserFromSession(event)
    console.log("Get user from session = ",user)
    if (user) event.context.user = user*/

    const authenticationToken = getRequestHeader(event, "Authentication-Token")
    if (!authenticationToken) {
        throw UnauthorizedError("Missing authorization header")
    }

    const payload = validateToken(authenticationToken)
    if (!payload) {
        throw UnauthorizedError("Invalid token")
    }

    console.log("User authenticated:",(payload as JwtPayload).id)
    // event.context.auth = {user:(payload as JwtPayload).id}
})


