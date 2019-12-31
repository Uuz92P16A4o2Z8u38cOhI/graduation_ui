// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/varCss.css'

//引入自定义标签组件
import Template from './components/template'

/* axios.defaults.baseURL = '' */
/* axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
}) */
Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.config.productionTip = false;

//注册自定义组件
Vue.use(Template);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
