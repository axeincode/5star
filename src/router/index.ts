import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/test',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Test',
        component: () => import('@/views/test/index.vue')
      },
    ],
  },
  {
    path: '/affiliate',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Affiliate',
        component: () => import('@/views/affiliate/index.vue'),
      },
    ],
  },
  {
    path: '/bonus-transaction',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Bonuses And Transactions',
        component: () => import('@/views/bonus_transaction/index.vue'),
      },
    ],
  },
  {
    path: '/account',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Account',
        component: () => import('@/views/account/index.vue'),
      },
    ],
  },
  {
    path: '/vip',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'VIP',
        component: () => import('@/views/vip/index.vue'),
      },
    ],
  },
  {
    path: '/game/:id?/:name?/:demo?',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Game',
        component: () => import('@/views/game/index.vue'),
      },
    ],
  },
  {
    path: '/sports',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Sports',
        component: () => import('@/views/sports/index.vue'),
      },
    ],
  },
  {
    path: '/about-us',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'About_US',
        component: () => import('@/views/about_us/index.vue'),
      },
    ],
  },
  {
    path: '/provider',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Provider',
        component: () => import('@/views/provider/index.vue'),
      },
    ],
  },
  {
    path: '/promo',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Promo',
        component: () => import('@/views/promo/index.vue'),
      },
      {
        path: 'detail',
        name: 'Promo_Detail',
        component: () => import('@/views/promo/detail/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
})

export default router
