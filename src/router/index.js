import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入登陆页面
import Login from '@/views/login/index'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
