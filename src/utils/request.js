import axios from 'axios'
import { Toast } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Toast.fail(res.message || 'error')
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        Toast.fail('50000')
      }
      return Promise.reject(res.message || 'error')
    } else {
      console.log(res)
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error)
    return Promise.reject(error)
  }
)

export default service
