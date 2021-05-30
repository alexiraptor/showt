import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/UserCRUD.vue'
import CrudAdmin from '../views/Viewtest.vue'
import Crud from '../components/CRUDconcerts/CRUDconcerts-compo.vue'
import Showconcert from '../components/CRUDconcerts/Showconcert.vue'
import ShowUser from '../components/ShowUser.vue'
import Wishlist from '../components/Wishlist.vue'
import ConcertUpdated from '../components/CRUDconcerts/ConcertUpdated.vue'
// import Wishlist from '../views/Wishlist.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/myspace',
    name: 'myspace',
    component: Users
  },
  {
    path: '/admin',
    name: 'admin',
    component: CrudAdmin
  },
  {
    path: '/showuser',
    name: 'ShowUser',
    component: ShowUser,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/crudconcert',
    name: 'Crud',
    component: Crud,
  },
  {
    path: '/showconcert',
    name: 'Showconcert',
    component: Showconcert,
  },
  {
    path: '/concertupdated',
    name: 'ConcertUpdated',
    component: ConcertUpdated,
  },
  // {
  //   path: '/wishlist',
  //   name: 'Wishlist',
  //   component: Wishlist
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
