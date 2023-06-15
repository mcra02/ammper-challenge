<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'PublicLayout',

  setup () {
    onMounted(() => {
      console.warn(process.env)
    })
  }
})
</script>

<style lang="scss" scoped>

</style>
