export const usePosts = () => {
    const posts = ref([])

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3001/posts')
            posts.value = await response.json()
        } catch (error) {
            console.error('Error fetching posts:', error)
        }
    }

    return {
        posts,
        fetchPosts
    }
}
