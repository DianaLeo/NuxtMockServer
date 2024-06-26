export default defineEventHandler(async (event) => {
    const authenticationToken = getRequestHeader(event, "Authentication-Token")
    console.log("authenticationToken=",authenticationToken)
})