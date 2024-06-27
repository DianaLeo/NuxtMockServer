export default defineEventHandler(async (event) => {
    if (event.path.startsWith("/api/frontend/customer") || event.path === "/") return

    console.log("Checking authentication...")

    const user = await getUserFromSession(event)
    console.log("Get user from session = ",user)
    if (!user) throw UnauthorizedError("You need to log in")
    event.context.user = user
})


