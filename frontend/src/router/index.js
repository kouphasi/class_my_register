import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginVue.vue'
import Form from "../views/FormVue.vue"
import Execute from "../views/ExecuteVue.vue"


const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  // {
  //   path: '/login',
  //   name: 'Login1',
  //   component: LoginView
  // },
  // {
  //   path: '/main/login',
  //   name: 'Login2',
  //   component: LoginView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/main",
    name: "Main",
    component: Form
  },
  {
    path: "/execute",
    name: "Execute",
    component: Execute,
    props: true
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
