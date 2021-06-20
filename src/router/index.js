import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Personal from '../pages/Personal.vue'
import Search from '../pages/Search.vue'
import Chatroom from '../pages/Chatroom.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom
  },
]

const router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
