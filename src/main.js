import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './styles/index.less'

// 导入element-ui
import ElementUI from 'element-ui'

// 导入element的css样式
import 'element-ui/lib/theme-chalk/index.css'

// 注册全局element
Vue.use(ElementUI)

// 关闭开发模式下的错误提醒
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
