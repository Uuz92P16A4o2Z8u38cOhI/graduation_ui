import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
import Cookies from "js-cookie"
import global from '@/utils/global'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/varCss.css'    //全局css
import Template from './components/template'   //引入自定义标签组件

 // axios.defaults.baseURL = 'http://127.0.0.1:9000/'
 axios.interceptors.request.use(config => {
  if (Cookies.get('access_token'))
    config.headers.Authorization = 'Bearer ' + Cookies.get('access_token')
  return config;
})

Vue.prototype.$http = axios
Vue.prototype.global = global // 挂载全局配置模块

Vue.use(ElementUI);

Vue.config.productionTip = false;

//注册自定义组件
Vue.use(Template);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
