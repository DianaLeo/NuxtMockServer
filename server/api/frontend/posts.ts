export default defineEventHandler({
    handler: async (event) => {
        let posts
        try {
            posts = await $fetch('http://localhost:8080/posts')
        } catch (error) {
            console.error('Error fetching posts:', error)
        }
        return posts
    },
})

