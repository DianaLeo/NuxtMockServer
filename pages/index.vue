<script setup lang="ts">
const { posts, fetchPosts } = usePosts()

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </div>
</template>


<style scoped>

</style>