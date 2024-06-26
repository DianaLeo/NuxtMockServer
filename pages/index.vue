<script setup lang="ts">
import type {User} from "~/types"
import type {NuxtError} from "#app"

const data = ref()

async function handleLogin() {
  try{
    data.value = await $fetch('/api/frontend/customer/login', {
      method: 'post',
      body: { email: "email1", password: "password1" }
    })
  }catch (error){
    const e = error as NuxtError
    throw createError({ statusCode: e.statusCode, statusMessage: e.message,fatal:true })
  }
}
</script>

<template>
  <div>
    <h1>Auth</h1>
    <button @click="handleLogin">Login</button>
    <p>{{data?.user}}</p>
  </div>
</template>


<style scoped>

</style>