import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { setToken, getToken, removeToken, isLogin } from '@/utils/auth'
import { isJSON } from '@/utils'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间(现在是50秒)
})

service.interceptors.request.use(
  config => {
    // 加载蒙层
    Toast.loading({
      mask: true,
      message: 'loading...',
      forbidClick: true,
      duration: 0
    })
    // 暂时加上TOKEN
    // 强制设置 token 在 getToken 函数中设置
    // config.headers['BM-App-Token'] = 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTk1NDYzMzIsImV4cCI6MTU2MjEzODMzMiwianRpIjoiNTE0NGYzMzI4NWY4MzI2MDgxODEwMjNmZWMyNDI5ZmQiLCJzZWMiOiIxM2ViY2FjN2U4YjIwMjIyNjZhODk5MGQ5MjY2OGE1MyIsInNpZyI6IjExZWE0Zjc2ODA0NGM5ZmZkNDkxN2MxMDA4M2RlZTdjMWIyOGJkOWU2ZjAxYWI5YTI4MzQ2NjBmNTJlMjUyMTUifQ.LKEKkrXLCD57xlVMb_8NQtJggXrCgyd4iGXZb36x7b0'
    if (isLogin()) {
      config.headers['BM-App-Token'] = getToken()
    }
    config.headers['Accept'] = 'application/prs.BM-APP-API.v1+json'
    // 此处如果有JSON数据，需要加上请求头
    if (isJSON(config.data)) {
      config.headers['Content-Type'] = 'application/json'
      // console.log(config.data)
      return config
    }
    // 去除options预请求方法
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      console.log('请求参数：', config.data)
    }
    return config
  },
  error => {
    Toast.clear()
    // FIXME 如果请求是用户为登录请求失败，跳转到登录界面
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    Toast.clear()
    if (response.headers['bm-app-token']) {
      setToken(response.headers['bm-app-token'])
    }
    const res = response.data
    if (res.code !== 1) {
      if (res.status_code === 403) {
        // 清理登录信息并跳转到登录页面
        removeToken()
        store.commit('CLEAR_USER_INFO')
        import('@/route/index').then(module => {
          module.default.push('/login')
        })
      }
      Toast.fail(res.message || 'error')
      return Promise.reject(res.message || 'error')
    } else {
      Toast.success(res.message)
    }
    // console.log(res)
    return res
  },
  error => {
    Toast.clear()
    Toast.fail(error)
    return Promise.reject(error)
  }
)

export default service
