<template>
  <v-container>
    <h1 class="text-h3 mb-4 text-primary">User List</h1>
    <v-row>
      <v-col v-for="user in users" :key="user.email" cols="12" md="6" lg="4">
        <v-card class="pa-4" variant="outlined" color="primary">
          <div class="d-flex flex-no-wrap">
            <v-avatar :image="user.picture.large" size="128"></v-avatar>
            <div>
              <v-card-title>{{ user.name.first }} {{ user.name.last }}</v-card-title>
              <v-card-subtitle>{{ user.email }}</v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div ref="loader" class="d-flex justify-center mt-4 loader">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { getUsers } from '@/api/get-users'
import type { User } from '@/models/user.interface'

export default defineComponent({
  setup() {
    const users = ref<User[]>([]) // Array to hold the list of users
    const throttledLoad = ref<ReturnType<typeof setTimeout> | undefined>() // timeout counter for throttled search

    /**
     * Fetch user data and update users array
     * @returns {Promise<void>} - A promise that resolves when users are fetched.
     */
    const fetchUsers = async (): Promise<void> => {
      try {
        const response: User[] = await getUsers()
        users.value.push(...response) // Append new users to the existing list
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    /**
     * Load more users when the loader comes into view using Timeout for optimized queryCount
     */
    const handleLoadMore = (): void => {
      clearTimeout(throttledLoad.value)
      throttledLoad.value = setTimeout(() => fetchUsers(), 600)
    }

    /**
     * Set up an Intersection Observer to detect when the loader is in view.
     */
    const setupObserver = (): void => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore()
        }
      })

      const loaderElement = document.querySelector('.loader')
      if (loaderElement) {
        observer.observe(loaderElement)
      }

      // Cleanup observer on component unmount
      onBeforeUnmount(() => {
        observer.disconnect()
      })
    }

    /**
     * Lifecycle hook to fetch initial users and set up the observer.
     */
    onMounted(() => {
      handleLoadMore()
      setupObserver()
    })

    return {
      users,
    }
  },
})
</script>

<style>
.d-flex {
  display: flex;
}
.flex-no-wrap {
  flex-wrap: nowrap;
}
.justify-center {
  justify-content: center;
}
.pa-4 {
  padding: 16px !important;
}
.mb-4 {
  margin-bottom: 16px !important;
}
.mt-4 {
  margin-top: 16px !important;
}
</style>
