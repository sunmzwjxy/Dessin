import Vue from 'vue'
import Vuex from 'vuex'
import canvas from './modules/canvas'
import menu from './modules/menu'
import node from './modules/node'
import line from './modules/line'
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
    node,
    line,
    notice
  }
})
