<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-capitalize">
          {{ auth?.user?.fullname }}
        </q-toolbar-title>

        <div>
          <q-btn
            color="white"
            text-color="black"
            label="Cerrar Sesion"
            @click="onLogout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import EssentialLink from 'components/layout/EssentialLink.vue'
import { useRouter } from 'vue-router'

const linksList = [
  {
    title: 'Perfil',
    caption: 'Informacion de usuario',
    icon: 'person',
    link: 'perfil'
  },
  {
    title: 'Transacciones',
    caption: 'Movimientos',
    icon: 'query_stats',
    link: 'transacciones'
  }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const router = useRouter()

    const leftDrawerOpen = ref(false)

    const auth = ref<any>(null)

    const onLogout = () => {
      localStorage.removeItem('auth')
      router.push({ name: 'login' })
    }

    onMounted(() => {
      auth.value = JSON.parse(localStorage.getItem('auth') ?? '{}')
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      onLogout,
      auth
    }
  }
})
</script>
