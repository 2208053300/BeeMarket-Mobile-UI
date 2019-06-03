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
    config.headers['BM-App-Token'] = 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTkyMTk0MjQsImV4cCI6MTU2MTg5NzgyNCwianRpIjoiZGQ0OTA4NjRhZmU0M2I5OTk5ZTIyMzIxMDIxZjNjOGMiLCJzZWMiOiI1Y2Q1YTcyMmI2ZTk5YTViMjJhZDBjODhhMGUzMzcxYiIsInNpZyI6ImZiMWE3ZDY3OWZmOTBhMTNkZTI3NzNlNGYxZGMyZDQ3NTk5ZDljNmM1N2M1YjA1MDM4ZDRkM2FkOWVlYjJmZDUifQ.JnLfMFDk0fUpyi94KCeIXwMmbsd-ijtcFw7muYzdftE'
    config.headers['Accept'] = 'application/prs.BM-APP-API.v1+json'
    // 此处如果有JSON数据，需要加上请求头
    if (isJSON(config.data)) {
      config.headers['Content-Type'] = 'application/json'
      console.log(config.data)
      return config
    }
    // 去除options预请求方法
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
      console.log(config.data)
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
    if (res.status_code !== 200) {
      Toast.fail(res.message || 'error')
      return Promise.reject(res.message || 'error')
    } else {
      Toast.success(res.message)
    }
    console.log(res)
    return res
  },
  error => {
    Toast.fail(error)
    return Promise.reject(error)
  }
)

export default service
