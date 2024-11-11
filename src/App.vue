<template>
  <main>
    <UserList />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserList from '@/components/UserList.vue'

export default defineComponent({
  components: {
    UserList,
  },
})
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
