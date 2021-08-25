import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/login.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 注意要引入css样式文件
import store from '@/store'

Vue.use(VueRouter)

// Turn off loading spinner by setting it to false. (default: true),ease可以设置css3动画，如ease，linear；speed是进度条从开始到结束的耗时
NProgress.configure({ showSpinner: false, ease: 'linear', speed: 500 })

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // a meta field
    // 访问主页需要判断Auth
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
