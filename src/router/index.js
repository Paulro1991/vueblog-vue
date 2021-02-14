import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Blogs from '../views/Blogs.vue'
import BlogEdit from '../views/BlogEdit.vue'
import BlogDetail from '../views/BlogDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: 'Blogs'}
  },

  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/blogs/add',
    name: 'BlogAdd',
    component: BlogEdit
  },

  {
    path: '/blogs/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },

  {
    path: '/blogs/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
