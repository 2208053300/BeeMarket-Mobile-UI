import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import {
  setToken,
  getToken,
  removeToken,
  isLogin,
  checkToken,
  getVerify,
  setVerify
} from '@/utils/auth'
import { isJSON } from '@/utils'
import store from '@/store'
import { getOs } from '@/utils'

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间(现在是50秒)
})

service.interceptors.request.use(
  async config => {
    // 加载蒙层
    Toast.loading({
      mask: false,
      forbidClick: true,
      duration: 0,
      className: 'loadingPop'
    })
    console.log('请求参数：', config.data)
    // 强制设置 token 在 getToken 函数中设置
    const osObj = getOs()
    if (await isLogin()) {
      config.headers['BM-App-Token'] = await getToken()
      config.headers['BM-Verify-Ver'] = getVerify()
    } else if (osObj.isWx) {
      // REVIEW 如果是微信，默认第一次直接授权
      checkToken()
    }
    config.headers['Accept'] = 'application/prs.BM-APP-API.v1+json'
    // 此处如果有JSON数据，需要加上请求头
    if (isJSON(config.data)) {
      config.headers['Content-Type'] = 'application/json'
      return config
    }
    // 去除options预请求方法
    if (config.method === 'post') {
      // config.data = qs.stringify(config.data)
      if (config.data) {
        const keys = Object.keys(config.data)
        if (keys.length > 0) {
          config.data = qs.stringify(config.data)
        }
      }
    }
    return config
  },
  error => {
    Toast.clear()
    Toast.fail('服务器错误！')
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    Toast.clear()
    console.log(response)
    if (response.headers['bm-app-token']) {
      setToken(response.headers['bm-app-token'])
    }
    if (response.headers['bm-verify-ver']) {
      setVerify(response.headers['bm-verify-ver'])
    }
    const res = response.data
    if (res.code !== 1) {
      if (res.status_code === 400 && res.message === '获取用户信息失败') {
        checkToken()
      }
      // if (res.status_code === 403) {
      //   // Toast('登录信息失效')
      //   // 清理登录信息并跳转到登录页面
      //   removeToken()
      //   store.commit('CLEAR_USER_INFO')
      //   checkToken()
      // }
      return Promise.reject(res.message || 'error')
    } else {
      // Toast.success(res.message)
    }
    return res
  },
  error => {
    Toast.clear()
    Toast.fail(error)
    return Promise.reject(error)
  }
)

export default service
