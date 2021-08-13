const canvas = {
  namespaced: true,
  state: {
    // header pops
    data: {
      scale: 1,
      lineName: 'curve',
      lineWidth: 1,
      fromArrow: '',
      toArrow: 'triangleSolid',
      locked: 0,
      autoAnchor: false
    },
    // file pops
    filePops: {
      canvasfile: {
        name: '', // 文件名
        folder: '', // 文件夹
        classify: '' // 分类
      },
      canvalColor: {
        bkColor: '#000',
        bkPictur: '',
        grid: false,
        gridColor: '#000',
        gridSize: '',
        rule: false,
        ruleColor: '#000'
      }
    }
  },
  mutations: {
    scale(state, value) {
      state.data.scale = value
    },
    lineName(state, value) {
      state.data.lineName = value
    },
    lineWidth(state, value) {
      state.data.lineWidth = value
    },
    fromArrow(state, value) {
      state.data.fromArrow = value
    },
    toArrow(state, value) {
      state.data.toArrow = value
    },
    locked(state, value) {
      state.data.locked = value
    },
    autoAnchor(state, value) {
      state.data.autoAnchor = value
    },
    resize(state, value) {}
  },
  actions: {},
  getters: {},
  modules: {}
}

export default canvas
