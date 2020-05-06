/**
 * 这个页面是配置路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// TODO: 路由懒加载

// 导入登陆页面
const Login = () => import('@/views/login/index')

// 导入框架页面
const LayoutIndex = () => import(/* webpackChunkName: "group-foo" */ '@/views/layout/index')

// 导入首页
const Home = () => import(/* webpackChunkName: "group-foo" */ '@/views/home/index')

// 导入文章列表页面
const Article = () => import(/* webpackChunkName: "group-foo" */ '@/views/article/index')

// 导入发表文章页面
const Publish = () => import('@/views/publish/index')

// 导入素材管理页面
const Image = () => import('@/views/image/index')

// 导入评论管理页面
const Comment = () => import('@/views/comment/index')

// 导入个人设置页面
const Settings = () => import('@/views/settings/index')

// 导入粉丝页面
const Fans = () => import('@/views/fans/index')

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
      { path: '/image', name: 'image', component: Image },
      { path: '/comment', name: 'comment', component: Comment },
      { path: '/settings', name: 'settings', component: Settings },
      { path: '/fans', name: 'fans', component: Fans }
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
