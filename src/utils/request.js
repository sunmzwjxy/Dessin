import axios from 'axios'
import store from './store'

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:3000/'
})

// 发送请求之前添加预处理(token)
instance.interceptors.request.use(
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
instance.interceptors.response.use(
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
