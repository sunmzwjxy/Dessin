import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './assets/fonts/iconfont.css'
import '@/styles/index.scss'
import './plugins/element.js'

// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3000/'
// axios.defaults.headers.common.Authorization = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// Add a request interceptor
// 发送请求之前添加预处理(token)
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // config.headers.Authorization = store.state.userinfo.token
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    // return Promise.reject(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 跳转登录
          store.dispatch('logout')
      }
    }
  }
)

Vue.config.productionTip = false
// 挂载axios到Vue上
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
