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
      if (data === null) {
        // header props
        state.data.scale = 1
        state.data.lineName = 'curve'
        state.data.lineWidth = 1
        state.data.fromArrow = ''
        state.data.toArrow = 'triangleSolid'
        state.data.locked = 0
        state.data.autoAnchor = false

        // file props
        state.filePops.name = '' // 文件名
        state.filePops.folder = '' // 文件夹
        state.filePops.classify = '' // 分类
        state.filePops.bkColor = '#000'
        state.filePops.bkPictur = ''
        state.filePops.grid = false
        state.filePops.gridColor = '#000'
        state.filePops.gridSize = 10
        state.filePops.rule = false
        state.filePops.ruleColor = '#000'
      }
    }
  },
  actions: {},
  getters: {},
  modules: {}
}

export default canvas
