import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { setToken } from '@/utils/auth'
import { isJSON } from '@/utils'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    // 暂时加上TOKEN
    // config.headers['BM-App-Token'] = getToken()
    config.headers['BM-App-Token'] = 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTk4MDM5NjksImV4cCI6MTU2MjM5NTk2OSwianRpIjoiMGY4NTNjNjNhNmE4M2Q4ZjhkZjFmNjhlYzgzOWE4ZGYiLCJzZWMiOiIzMTY5YTA3YTcwYmJkZGNiY2M1YjMwYzM2MWJmNTZlOCIsInNpZyI6ImU0ZmUxNjcwNWQ3NTQxODkwODNlMzk3ODM0YjQ5NDE2OTg3ZWM0YWU4OTVjMDNmYmYyM2M5OTA0MjM3NWVjMGYifQ.AmN2XqqG-M-sTER5DphtarnJRHiQqxn-GUHBd8jpht0'
    config.headers['Accept'] = 'application/prs.BM-APP-API.v1+json'
    // 此处如果有JSON数据，需要加上请求头
    if (isJSON(config.data)) {
      config.headers['Content-Type'] = 'application/json'
      // config.headers['Content-Type'] = 'application/*'
      // console.log(config.data)
      return config
    }
    // 去除options预请求方法
    if (config.method === 'post') {
      console.log(config.data, typeof config.data)
      if (config.data) {
        const keys = Object.keys(config.data)
        if (keys.length > 0) {
          config.data = qs.stringify(config.data)
        }
      }

      // config.data = qs.stringify(config.data)
      console.log('请求参数：', config.data)
    }
    return config
  },
  error => {
    // FIXME 如果请求是用户为登录请求失败，跳转到登录界面
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.headers['bm-app-token']) {
      setToken(response.headers['bm-app-token'])
    }
    const res = response.data
    if (res.code !== 1) {
      Toast.fail(res.message || 'error')
      return Promise.reject(res.message || 'error')
    } else {
      Toast.success(res.message)
    }
    // console.log(res)
    return res
  },
  error => {
    Toast.fail(error)
    return Promise.reject(error)
  }
)

export default service
