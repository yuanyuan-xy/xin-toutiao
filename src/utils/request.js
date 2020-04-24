// 引入axios
import axios from 'axios'
// 引入json-bigint来处理id过长的问题
import JSONBig from 'json-bigint'

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

// 导出
export default request
