import Vue from 'vue'
import Router from 'vue-router'
import Cookies from "js-cookie"
import login from '@/components/login'
import index from '@/components/index'
import noError from '@/components/noError'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/404',
      name: 'noError',
      component: noError
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // const tokenString = window.sessionStorage.getItem("token")
  const tokenString = Cookies.get("token")
  if (!tokenString) return next('/login')
  next()
})


export default router
