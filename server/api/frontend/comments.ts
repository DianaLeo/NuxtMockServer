export default defineEventHandler({
    handler: async (event) => {
        let comments
        try {
            comments = await $fetch('http://localhost:8080/comments')
        } catch (error) {
            console.error('Error fetching comments:', error)
        }
        return comments
    },
})