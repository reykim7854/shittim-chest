import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/', component: () => import('pages/IndexPage.vue') }]
  },
  {
    name: 'Student',
    path: '/student',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Student List',
        path: '',
        component: () => import('src/pages/StudentPage.vue')
      }
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
