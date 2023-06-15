<template>
  <q-page class="row items-center justify-evenly">
    <div class="text-h5">
      Hola {{ user?.fullname ?? '' }}
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { },
  setup () {
    const user = ref<any>(null)

    onMounted(() => {
      const auth = JSON.parse(localStorage.getItem('auth') ?? '{}')
      user.value = auth.user
    })
    return { user }
  }
})
</script>
