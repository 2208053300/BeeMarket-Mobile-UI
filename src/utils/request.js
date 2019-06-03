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
    config.headers['BM-App-Token'] = 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTk1NTgwNDksImV4cCI6MTU2MjE1MDA0OSwianRpIjoiYjk4NDdmMDVjNzFjMzU2YWIyMGNlZmY1MjgyMjM2MWMiLCJzZWMiOiJlNWQ2YTFmZmU4ODE0NjYwYjI3ZGE2Mjk3OGUwMzk3MyIsInNpZyI6ImEyNWE3ZmY3OWU3MjY4YTc2MTMxNTc5MWI3NDNkYzYxYzlhYjVhNzBhMGY2MDZlMzIxOWM3Y2JlN2EyNjIzNTgifQ.K4Ax3YCB-cdCsUzZYuxP8TlESlS_SILUUAXIOa_G-bI'
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
