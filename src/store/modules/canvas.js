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
      name: '', // 文件名
      folder: '', // 文件夹
      classify: '', // 分类
      bkColor: '#000',
      bkPictur: '',
      grid: false,
      gridColor: '#000',
      gridSize: 10,
      rule: false,
      ruleColor: '#000'
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
    resize(state, value) {},
    // lazy
    canvasfile(state, data) {
      // 动态获取变量名并动态赋值
      state.filePops[data.key] = data.value
    },
    init(state, data) {
      // header Props
      for (const key in state.data) {
        if (data[key] !== undefined) {
          state.data[key] = data[key]
        }
      }
      // file panel
      for (const key in state.filePops) {
        if (data[key] !== undefined) {
          state.filePops[key] = data[key]
        } else {
          switch (key) {
            case 'grid':
            case 'rule':
              state.filePops[key] = false
              break
            default:
              state.filePops[key] = ''
              break
          }
        }
      }
    }
  },
  actions: {},
  getters: {},
  modules: {}
}

export default canvas
