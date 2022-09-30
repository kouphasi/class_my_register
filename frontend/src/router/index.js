import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginVue.vue'
import Form from "../views/FormVue.vue"

const routes = [
  {
    path: '/a',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/",
    name: "Main",
    component: Form
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
