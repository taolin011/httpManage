import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "login",
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('../views/layout/index.vue'),
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }, {
        name: 'interface',
        path: '/interface/:id',
        component: () => import('../views/interface/index.vue'),
        children: [{
          name: 'interfaces',
          path: '/interfaces/:id',
          component: () => import('../views/interfaces/index.vue'),
        }]
      }],

    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})


export default router
