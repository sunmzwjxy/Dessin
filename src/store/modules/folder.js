import Vue from 'vue'

const folder = {
  namespaced: true,
  state: {
    data: {}
  },
  mutations: {},
  actions: {
    folders(context, data) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$axios
          .get('/data/folder', { params: { userId: context.rootGetters.getUserId } })
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    dessin(context, data) {
      data.userId = context.rootGetters.getUserId
      return new Promise((resolve, reject) => {
        Vue.prototype.$axios
          .get('/data/dessin', { params: data })
          .then(res => resolve(res.data))
          .catch(err => reject(err))
      })
    },
    newFolder(context, data) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$axios
          .post('/data/new/folder', data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default folder
