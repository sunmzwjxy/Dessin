import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'
import menu from './modules/menu'
import notice from './modules/notice'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    canvas,
    menu,
    notice
  }
})
