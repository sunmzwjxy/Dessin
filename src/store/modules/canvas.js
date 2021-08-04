const canvas = {
  namespaced: true,
  state: {
    data: {
      scale: 1,
      lineName: 'curve',
      lineWidth: 1,
      fromArrow: '',
      toArrow: 'triangleSolid',
      locked: 0
    }
  },
  mutations: {
    data(state, data) {
      state.data = data
    }
  },
  actions: {},
  getters: {},
  modules: {}
}

export default canvas
