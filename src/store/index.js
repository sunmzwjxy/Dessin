import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'
import menu from './modules/menu'
import node from './modules/node'
import line from './modules/line'
import notice from './modules/notice'
import folder from './modules/folder'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      id: '',
      username: '',
      password: '',
      token: '',
      status: ''
    }
  },
  mutations: {
    auth_request(state, data) {
      state.userinfo.status = 'loading'
      state.userinfo.token = ''
      state.userinfo.username = ''
    },
    auth_success(state, data) {
      state.userinfo = data
    },
    auth_error(state, data) {
      state.userinfo.status = 'error'
      state.userinfo.token = ''
      state.userinfo.username = ''
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('auth_request')
        Vue.prototype.$axios
          .post('users/login', payload)
          .then(res => {
            const result = {
              id: res.data.data.id,
              username: payload.username,
              token: res.data.data.token,
              password: '',
              status: 'success'
            }
            context.commit('auth_success', result)
            // set token in sessionStorage
            window.sessionStorage.setItem('token', result.token)
            window.sessionStorage.setItem('userid', result.id)
            window.sessionStorage.setItem('username', result.username)
            resolve(result)
          })
          .catch(err => {
            context.commit('auth_error')
            reject(err)
          })
      })
    },
    logout(context, payload) {
      context.commit('auth_error')
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('userid')
      window.sessionStorage.removeItem('username')
    }
  },
  getters: {
    isLogin(state) {
      if (window.sessionStorage.getItem('token') !== null || state.userinfo.status === 'success') {
        return true
      } else {
        return false
      }
    },
    getUserId(state) {
      if (state.userinfo.id !== '') {
        return state.userinfo.id
      } else {
        state.userinfo.id = window.sessionStorage.getItem('userid')
        state.userinfo.token = window.sessionStorage.getItem('token')
        state.userinfo.username = window.sessionStorage.getItem('username')
        return state.userinfo.id
      }
    }
  },
  modules: {
    canvas,
    menu,
    node,
    line,
    notice,
    folder
  }
})
