import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    // 暂时加上TOKEN
    config.headers['BM-App-Token'] =
      'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTg2ODYzODMsImV4cCI6MTU2MTM2NDc4MywianRpIjoiYTVlNjA1Y2U0OTNiM2M4Y2JiOWI4MjIyMTQ3NGNmNWEiLCJzZWMiOiIxM2ViY2FjN2U4YjIwMjIyNjZhODk5MGQ5MjY2OGE1MyIsInNpZyI6IjM4NmUxZGJkNGEzYzQ1YjkyMjQ5ZDZiYjkzMDkwOTJjNzM4YWMxYjczOTg5M2RjZGRiZTI3ZmFjMDdmZDYwNTIifQ.nVwn4g69tE6LENK284_byWuomGB9tLsCKYl5Ue8w5LA'
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
    const res = response.data
    if (res.status_code !== 200) {
      Toast.fail(res.message || 'error')
      return Promise.reject(res.message || 'error')
    } else {
      console.log(res)
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error + '网断了')
    return Promise.reject(error)
  }
)

export default service
