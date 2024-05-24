import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/English',
      name: 'Angličtina',
      component: () => import('../views/English.vue')
    },
    {
      path: '/German',
      name: 'Němčina',
      component: () => import('../views/German.vue')
    },
    {
      path: '/Spanish',
      name: 'Španělština',
      component: () => import('../views/Spanish.vue')
    },
    {
      path: '/Czech',
      name: 'Čeština',
      component: () => import('../views/Czech.vue')
    }
  ]
})

export default router
