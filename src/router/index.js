/**
 * 这个页面是配置路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入登陆页面
import Login from '@/views/login/index'

// 导入框架页面
import LayoutIndex from '@/views/layout/index'

// 导入首页
import Home from '@/views/home/index'

// 导入文章列表页面
import Article from '@/views/article/index'

// 导入发表文章页面
import Publish from '@/views/publish/index'

// 导入素材管理页面
import Image from '@/views/image/index'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    component: LayoutIndex,
    children: [
      { path: '', name: 'home', component: Home },
      { path: '/article', name: 'article', component: Article },
      { path: '/publish', name: 'publish', component: Publish },
      { path: '/image', name: 'image', component: Image }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
