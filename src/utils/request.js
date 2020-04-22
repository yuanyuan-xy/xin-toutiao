// 引入axios
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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

// 导出
export default request
