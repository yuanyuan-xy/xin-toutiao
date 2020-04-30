// 引入axios
import axios from 'axios'
// 引入json-bigint来处理id过长的问题
import JSONBig from 'json-bigint'

// 导入路由
import router from '@/router'

// 非组件模块可以这样加载使用 element 的 message 提示组件
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 处理返回的结果
  transformResponse: [function (data) {
    // 里面写如何处理的data
    // try-catch 是用来处理异常的情况
    try {
      return JSONBig.parse(data)
    } catch (err) {
      console.log(err)
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 成功
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
},
// 失败
function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 成功的时候
  return response
}, function (error) {
  const { status } = error.response
  // 失败的时候
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }

  return Promise.reject(error)
})

// 导出
export default request
