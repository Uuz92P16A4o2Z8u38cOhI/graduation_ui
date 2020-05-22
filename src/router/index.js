import Vue from 'vue'
import Router from 'vue-router'
import Cookies from "js-cookie"
import login from '@/components/login'
import index from '@/components/index'

// import api from '@/api/api'
import store from '@/store'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
//路由教师页面
import Home from '@/views/index'
import BasicInformation from '@/views/teachers/basicInformation/index'
import Award from '@/views/teachers/award/index'
import Education from '@/views/teachers/education/index'
import Family from '@/views/teachers/family/index'
import Research from '@/views/teachers/research/index'
import Teach from '@/views/teachers/teach/index'
import Work from '@/views/teachers/work/index'
//行政机构页面
import Admin from '@/views/organization/administration/index.vue'
import Unit from '@/views/organization/teachingUnit/index.vue'
//路由服务页面
import services from '@/views/services/index'
import eureka from '@/views/services/eureka/index'
import swaggerUi from '@/views/services/swaggerUi/index'
import rabbitmq from '@/views/services/rabbitMQ/index'
//系统管理页面
import User from '@/views/system/user/index'
import Role from '@/views/system/role/index'
import Permission from '@/views/system/permission/index'
import Dict from '@/views/system/dictionary/index'
import Log from '@/views/system/logging/index'
//个人信息管理
import Versions from '@/views/informationMaintenance/versions/index'
import Info from '@/views/informationMaintenance/info/index'
//异常页面
import noError from '@/components/noError'
import forbidden from '@/views/exception/403'
import notFound from '@/views/exception/404'
import serverError from '@/views/exception/500'

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        icon: 'iconfont icon-zhuye',
      },
      children : [
        {
          name: '基础信息',
          path: 'basicInformation',
          component : BasicInformation,
          meta:{
            icon: 'el-icon-postcard',
          }
        },
        {
          name: '获奖情况',
          path: 'award',
          component : Award,
          meta:{
            icon: 'iconfont icon-huojiang',
          }
        },
        {
          name: '教育情况',
          path: 'education',
          component : Education,
          meta:{
            icon: 'iconfont icon-jiaoyu',
          }
        },
        {
          name: '家庭情况',
          path: 'family',
          component : Family,
          meta:{
            icon: 'iconfont icon-jiating',
          }
        },
        {
          name: '科研活动',
          path: 'research',
          component : Research,
          meta:{
            icon: 'iconfont icon-keyan',
          }
        },
        {
          name: '教学活动',
          path: 'teach',
          component : Teach,
          meta:{
            icon: 'iconfont icon-jiaoxue',
          }
        },
        {
          name: '工作情况',
          path: 'work',
          component : Work,
          meta:{
            icon: 'el-icon-monitor',
          }
        },
        {
          path: '',
          name: '主页',
          component: Home,
          meta:{
            icon: 'iconfont icon-zhuye',
          }
        }
      ]
    },
    {
      path: '/infoMaintenance',
      name: '个人信息管理',
      component: index,
      children: [
        {
          path: 'info',
          name: '信息管理',
          component: Info,
          meta: {
            icon: 'el-icon-c-scale-to-original',
          }
        },
        {
          path: 'versions',
          name: '版本管理',
          component: Versions,
          meta: {
            icon: 'el-icon-edit-outline',
          }
        }]
    },
    {
      path: '/sys',
      name: '系统管理',
      component: index,
      children : [
        {
          path: 'user',
          name: '用户管理',
          component: User,
          meta:{
            icon: 'iconfont icon-hangzheng',
          }
        },
        {
          path: 'role',
          name: '角色管理',
          component: Role,
          meta:{
            icon: 'iconfont icon-jiaoxuedanwei',
          }
        },
        {
          path: 'permission',
          name: '资源管理',
          component: Permission,
          meta:{
            icon: 'iconfont icon-jiaoxuedanwei',
          }
        },
        {
          path: 'dict',
          name: '字典管理',
          component: Dict,
          meta:{
            icon: 'iconfont icon-jiaoxuedanwei',
          }
        },
        {
          path: 'log',
          name: '日志管理',
          component: Log,
          meta:{
            icon: 'iconfont icon-jiaoxuedanwei',
          }
        },
      ]
    },
    {
      path: '/org',
      name: '组织机构',
      component: index,
      children : [
        {
          path: 'admin',
          name: '行政机构',
          component: Admin,
          meta:{
            icon: 'iconfont icon-hangzheng',
          }
        },
        {
          path: 'unit',
          name: '教学单位',
          component: Unit,
          meta:{
            icon: 'iconfont icon-jiaoxuedanwei',
          }
        },
    ]
    },
    {
      path: '/service',
      name: '服务',
      component: index, //services,
      meta:{
        icon: 'iconfont icon-fuwuzhili',
      },
      children : [
        {
          path: 'eureka',
          name: 'eureka',
          component: eureka,
          meta:{
            icon: 'iconfont icon-Eureka',
          }
        },
        {
          path: 'rabbitmq',
          name: 'rabbitmq',
          component: rabbitmq,
          meta:{
            icon: 'iconfont icon-rabbitmq',
          }
        },
        {
          path: 'swaggerUi',
          name: 'swaggerUi',
          component: swaggerUi,
          meta:{
            icon: 'iconfont icon-Eureka',
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/noError',
      name: 'noError',
      component: noError
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: forbidden
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: notFound
    },
    {
      path: '/serverError',
      name: 'serverError',
      component: serverError
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // const tokenString = window.sessionStorage.getItem("token")
  const tokenString = Cookies.get("access_token")
  if(!tokenString)
    return next('/login')
  else {
    /*this.$http.post('http://client:secret@localhost:9055/oauth/check_token', { token: tokenString }).then((res) => {
      console.log(res)
    })*/
    next()
  }
  next()
})

/*Vue.prototype.$http.interceptors.response.use(response =>{
  console.log(response)
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 403:
        router.push({ name: '' })
        break;
      case 404:
        router.push({ name: '' })
        break;
      case 500:
        router.push({ name: '' })
        break;

      default:
        error.message = `连接出错(${error.response.status})!`;
    }
  }
  return Promise.reject(error);
})*/


export default router
