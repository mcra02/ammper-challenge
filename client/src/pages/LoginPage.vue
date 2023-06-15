<template>
  <q-page class="row items-center justify-evenly">
    <LoginComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginComponent from 'components/Auth/LoginForm.vue'

export default defineComponent({

  name: 'LoginPage',
  components: {
    LoginComponent
  },

  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>
