const node = {
  namespaced: true,
  state: {
    data: {
    }
  },
  mutations: {
    init(state, data) {
      for (const key in data) {
        console.log('*** ' + key)
      }
    },
    setNode(state, data) {
      state.data = data
    }
  },
  actions: {}
}

export default node
