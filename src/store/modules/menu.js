const menu = {
  namespaced: true,
  state: {
    data: {
      name: null,
      data: null
    }
  },
  mutations: {
    emit(state, data) {
      state.data = data
    }
  },
  actions: {},
  getters: {},
  modules: {}
}

export default menu
