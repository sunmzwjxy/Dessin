import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/css/base.scss'
// import './assets/css/ECharts.css'
import '@/styles/index.scss'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
