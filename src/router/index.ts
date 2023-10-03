import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';

const routes = [
  {
    path: '/',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: defineAsyncComponent(() => import('@/views/home/index.vue')),
      },
    ],
  },
  {
    path: '/test',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'Test',
        component: defineAsyncComponent(() => import('@/views/test/index.vue'))
      },
    ],
  },
  {
    path: '/affiliate',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'Affiliate',
        component: defineAsyncComponent(() => import('@/views/affiliate/index.vue')),
      },
    ],
  },
  {
    path: '/bonus-transaction',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'Bonuses And Transactions',
        component: defineAsyncComponent(() => import('@/views/bonus_transaction/index.vue')),
      },
    ],
  },
  {
    path: '/account',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'Account',
        component: defineAsyncComponent(() => import('@/views/account/index.vue')),
      },
    ],
  },
  {
    path: '/vip',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'VIP',
        component: defineAsyncComponent(() => import('@/views/vip/index.vue')),
      },
    ],
  },
  {
    path: '/game/:id?/:name?',
    component: defineAsyncComponent(() => import('@/layouts/index.vue')),
    children: [
      {
        path: '',
        name: 'Game',
        component: defineAsyncComponent(() => import('@/views/game/index.vue')),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
})

export default router
