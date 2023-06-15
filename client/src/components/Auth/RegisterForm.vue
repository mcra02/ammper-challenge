<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card"
    >
      <q-card-section>
        <div class="text-h6 row items-center justify-evenly">
          Registro
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          v-model="model"
          outlined
          use-input
          hide-selected
          fill-input
          :loading="loading"
          label="Institucion"
          option-value="name"
          :option-label="val => val.display_name + ' - ' + val.country_code"
          input-debounce="0"
          :options="options"
          @filter="filterFn"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sin Resultados
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-form
          v-if="model?.form_fields"
          class="q-gutter-md"
          @submit="onSubmit"
        >
          <q-input
            v-model="formData.fullname"
            outlined
            label="Nombre Completo"
            :rules="[ val => val && val.length > 0 || 'Requerido']"
          />
          <div
            v-for="item in model?.form_fields"
            :key="item.name"
          >
            <q-select
              v-if="item.type === 'select'"
              v-model="formData[item.name]"
              outlined
              use-input
              fill-input
              emit-value
              map-options
              option-label="label"
              :option-value="val => val.code"
              :options="item.values"
              :label="item.placeholder"
            />

            <q-input
              v-else
              v-model="formData[item.name]"
              outlined
              :type="(item.type as any)"
              :label="item.name === 'username' ? `Usuario (${item.label})` : item.name === 'password' ? `Contraseña (${item.label})` :item.label"
              :rules="[val => regexValidation(item, val) ]"
            />
          </div>

          <div class="q-my-sm">
            <q-btn
              class="full-width"
              label="Enviar"
              type="submit"
              color="primary"
              :loading="submitLoading"
            />
          </div>
        </q-form>
        <q-btn
          class="full-width"
          label="Iniciar Sesion"
          color="secondary"
          :loading="submitLoading"
          @click="onLogin"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { Institution } from '../../interfaces/institution.interface'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const router = useRouter()
    const $q = useQuasar()

    const options = ref<Institution[]>([])
    const model = ref<Institution|null>(null)
    const loading = ref<boolean>(false)
    const submitLoading = ref<boolean>(false)

    const formData = ref<any>({
      institution: null,
      username: null,
      password: null,
      fullname: null
    })

    const findInstitutions = async () => {
      const rest = await api.get('/belvo/institutions')
      return rest.data.results
    }

    const filterFn = (val: string, update: any, abort: any) => {
      if (val.length < 2) {
        abort()
        return
      }

      update(async () => {
        const needle = val.toLowerCase()
        loading.value = true
        const res = await findInstitutions()
        options.value = res.filter((v: any) => (v.display_name + ' - ' + v.country_code).toLowerCase().indexOf(needle) > -1)
        loading.value = false
      })
    }

    const regexValidation = (item: any, val: any) => {
      if (new RegExp(item.validation).test(val)) { return true } else { return item.validation_message }
    }

    const onSubmit = async () => {
      try {
        submitLoading.value = true
        formData.value.institution = model.value?.name
        await api.post('/auth/signup', formData.value)
        router.push({ name: 'login' })
      } catch (error: any) {
        console.warn(error.response.data.message, 'asdasdasdasdasd')
        $q.notify({
          color: 'red',
          message: error?.response?.data?.message ?? 'Error',
          position: 'bottom',
          timeout: Math.random() * 5000 + 3000
        })
      } finally {
        submitLoading.value = false
      }
    }

    const onLogin = () => {
      router.push({ name: 'login' })
    }

    onMounted(async () => {
      // await findInstitutions()
    })

    return {
      isPwd: ref(true),
      options,
      model,
      filterFn,
      formData,
      onSubmit,
      regexValidation,
      loading,
      submitLoading,
      onLogin
    }
  }
})
</script>

<style scoped>

</style>
