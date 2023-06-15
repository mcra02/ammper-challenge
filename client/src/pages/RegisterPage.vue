<template>
  <q-page class="row items-center justify-evenly">
    <RegisterComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegisterComponent from 'components/Auth/RegisterForm.vue'

export default defineComponent({
  name: 'RegisterPage',
  components: {
    RegisterComponent
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>
