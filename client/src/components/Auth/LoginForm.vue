<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card"
    >
      <q-card-section>
        <div class="text-h6 row items-center justify-evenly">
          Login
        </div>
      </q-card-section>

      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="onSubmit"
        >
          <q-input
            v-model="formData.username"
            outlined
            label="Usuario"
            :rules="[ val => val && val.length > 0 || 'Requerido']"
          />
          <q-input
            v-model="formData.password"
            outlined
            type="password"
            label="Contraseña"
            :rules="[ val => val && val.length > 0 || 'Requerido']"
          />

          <div class="q-gutter-md">
            <q-btn
              class="full-width"
              label="Enviar"
              type="submit"
              color="primary"
              :loading="submitLoading"
            />

            <q-btn
              class="full-width"
              label="Registrarse"
              color="secondary"
              :loading="submitLoading"
              @click="onRegister"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const submitLoading = ref<boolean>(false)

    const formData = ref<any>({
      username: null,
      password: null
    })

    const onSubmit = async () => {
      submitLoading.value = true
      const res = await api.post('/auth/signin', formData.value)
      localStorage.setItem('auth', JSON.stringify(res.data))
      submitLoading.value = false
      router.push({ name: 'transacciones' })
    }

    const onRegister = () => {
      router.push({ name: 'registro' })
    }

    onMounted(async () => {
      // await findInstitutions()
    })

    return {
      isPwd: ref(true),
      formData,
      onSubmit,
      submitLoading,
      onRegister
    }
  }
})
</script>

<style scoped>

</style>
