import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
      { name: 'registro', path: 'registro', component: () => import('pages/RegisterPage.vue') },
      { name: 'login', path: 'login', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { name: 'perfil', path: '', component: () => import('pages/admin/IndexPage.vue') },
      { name: 'transacciones', path: 'transacciones', component: () => import('pages/admin/TransactionsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
