import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/:language?',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/:language/champion/:champName',
    name: 'Champion',
    component: () => import('../views/Champion/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
