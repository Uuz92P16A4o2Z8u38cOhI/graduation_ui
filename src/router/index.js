import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenString = window.sessionStorage.getItem("token")
  if (!tokenString) return next('/login')
  next()
}) */


export default router