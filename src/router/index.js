import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入登陆页面
import Login from '@/views/login/index'

// 导入框架页面
import LayoutIndex from '@/views/layout/index'

// 导入首页
import Home from '@/views/home/index'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    component: LayoutIndex,
    children: [
      { path: '', name: Home, component: Home }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
