<script setup lang="ts">
import type {CustomerAccountResponse, CustomerData} from "~/types"
import type {NuxtError} from "#app"

const loginResponse = ref<CustomerData>()
const registerResponse = ref<CustomerAccountResponse>()
const posts = ref()

async function handleRegister(){
  try {
    registerResponse.value = await $fetch('/api/frontend/customer/create', {
      method: 'post',
      body:{
        account: {
          firstName: "dfd",
          middleName: "daf",
          lastName: "strfdafing",
          dateOfBirth: "2024-06-26T01:55:07.535Z",
          gender: "f",
          phoneNumber: "daf",
          postalCode: "daf",
          city: "dafd",
          zip: "strdafsdaing",
          countryCode: "sfdaftring",
          currencyCode: "dasf",
          languageCode: "daf",
          phoneCode: "dafd",
          state: "daf",
          addressLine1: "fdafda",
          address: "dafs",
          email: "email2",
          password: "password1"
        },
        termsAndConditionsAccepted: true,
      }
    })
  } catch (error) {
    const e = error as NuxtError
    throw createError({ statusCode: e.statusCode, statusMessage: e.message,fatal:true })
  }
}

async function handleLogin() {
  try {
    loginResponse.value = await $fetch('/api/frontend/customer/login', {
      method: 'post',
      body: { email: "email1", password: "password1" }
    })
  } catch (error) {
    const e = error as NuxtError
    throw createError({ statusCode: e.statusCode, statusMessage: e.message,fatal:true })
  }
}

async function handlePosts(){
  try {
    posts.value = await $fetch('/api/frontend/posts')
  } catch (error) {
    const e = error as NuxtError
    throw createError({ statusCode: e.statusCode, statusMessage: e.message,fatal:true })
  }
}
</script>

<template>
  <div>
    <h1>Auth</h1>
    <button @click="handleRegister">Register</button>
    <p>{{registerResponse}}</p>
    <button @click="handleLogin">Login</button>
    <p>{{loginResponse}}</p>
    <button @click="handlePosts">Posts</button>
    <p>{{posts}}</p>
  </div>
</template>


<style scoped>

</style>