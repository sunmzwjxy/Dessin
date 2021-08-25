import Vue from 'vue'

const node = {
  namespaced: true,
  state: {
    data: {
      rect: { x: 0, y: 0, width: 1, height: 1 },
      rotate: 0,
      lineWidth: 1,
      dash: 1,
      strokeType: 0,
      lineGradientFromColor: '#888888',
      lineGradientToColor: '#00FF26',
      bkType: 0,
      gradientFromColor: '#888888',
      gradientToColor: '#00FF26',
      gradientAngle: 0,
      gradientRadius: 0,
      globalAlpha: 1
    }
  },
  mutations: {
    setNode(state, data) {
      state.data = data
    },
    updateNode(state, data) {
      switch (data.key) {
        case 'x':
        case 'y':
        case 'width':
        case 'height':
          // 使用Vue.set可以同步更新视图
          // state.data.rect[data.key] = data.value
          Vue.set(state.data.rect, data.key, data.value)
          break
        case 'strokeType':
          Vue.set(state.data, 'strokeType', data.value)
          Vue.set(state.data, 'lineGradientFromColor', '#888888')
          Vue.set(state.data, 'lineGradientToColor', '#00FF26')
          break
        case 'bkType':
          Vue.set(state.data, 'bkType', data.value)
          Vue.set(state.data, 'gradientFromColor', '#888888')
          Vue.set(state.data, 'gradientToColor', '#00FF26')
          break
        default:
          Vue.set(state.data, data.key, data.value)
      }
    }
  },
  actions: {}
}

export default node
