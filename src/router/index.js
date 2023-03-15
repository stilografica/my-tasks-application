import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'board',
      component: () => import('../views/BoardView.vue'),
      children: [
        {
          path: '/task/:id',
          name: 'task',
          component: () => import('../views/TaskView.vue')
        },
      ]
    },
  ]
})

export default router
