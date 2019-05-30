import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { getToken, setToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    // 暂时加上TOKEN
    config.headers['BM-App-Token'] = getToken()
    // config.headers['BM-App-Token'] =
    //   'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTkwOTQzMjAsImV4cCI6MTU2MTc3MjcyMCwianRpIjoiY2MyZGJlZmUyNTNkMzJmNTgyOTJlNWM3NTQ4NGFmMzMiLCJzZWMiOiJmN2JiNWIwZjg4YjkyZTZjZmJhMTRjMzU2ZDE3YjE0NyIsInNpZyI6IjNkMDc5NGJiZWJmYjAyMzgzZGRkMzA1ZDhiMWQ3MWE1YjlmMzdhZDQ4ZjhhNGI5YTRjZjAwNGMyZjQ4NzFiZGIifQ.nOwOmjGHm8qWiEE0_wsocO8wXG-muEzvRy8ZzcKMAoQ'
    config.headers['Accept'] = 'application/prs.BM-APP-API.v1+json'
    // 去除options预请求方法
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
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
    // if (res.status_code !== 200 || res.status_code !== 201) {
    //   Toast.fail(res.message || 'error')
    //   return Promise.reject(res.message || 'error')
    // } else {
    //   console.log(res)
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error + '网断了')
    return Promise.reject(error)
  }
)

export default service
