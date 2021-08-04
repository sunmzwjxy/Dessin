const notice = {
  namespaced: true,
  state: {
    error: {
      text: ''
    }
  },
  mutations: {
    error(state, error) {
      state.error = error
    }
  },
  actions: {},
  getters: {},
  modules: {}
}

export default notice
