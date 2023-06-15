<template>
  <q-page class="row items-center justify-evenly">
    <div />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  components: { },
  setup () {
    const router = useRouter()

    onMounted(() => {
      router.push({ name: 'login' })
    })
    return { }
  }
})
</script>
