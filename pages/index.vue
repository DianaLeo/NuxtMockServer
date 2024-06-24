<script setup lang="ts">
import type {User} from "~/types"

const data = ref()

async function handleClick() {
  data.value = await $fetch('/api/frontend/customer/login', {
    method: 'post',
    body: { email: "email", password: "password" }
  })
}
</script>

<template>
  <div>
    <h1>Users</h1>
    <button @click="handleClick">Add User</button>
    <p>{{data?.body}}</p>
  </div>
</template>


<style scoped>

</style>