import { getOs } from '@/utils'
import { Base64 } from 'js-base64'
import Cookies from 'js-cookie'

// 获取Token
export function getToken() {
  const osObj = getOs()
  if (osObj.isIphone || osObj.isAndroid || osObj.isWx) {
    return Cookies.get('token')
  } else {
    return localStorage.getItem('BM-App-Token')
  }
  // return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjAyMTkxODUsImV4cCI6MTU2MjgxMTE4NSwianRpIjoiMGM0YTEyYzEzY2RjM2M1NGIwOGRiOWYyMGVlYTZjNWYiLCJzZWMiOiI5MzBkMTg4MzRmNDJjYzgzMWQyZTcwMTk4MzU3ZDIxMCIsInNpZyI6IjQ2MzJhNTdmYTNlNWJlZGUzMTg0MTAyMTBhNGU3MjE0OGYyNDNhNTVmMTE5OGQ2YjRiNTM4MTNmMTliZGRkNzMifQ.wFCE1AXPmHH4JOVR6LwNC9Yy0mX2YRXwWDhiLeBe2fA'
}
// 设置Token
// REVIEW sessionStorage才会在关闭浏览器的时候被清除
export function setToken(Token) {
  return localStorage.setItem('BM-App-Token', Token)
}
// 判断是否登录
export function isLogin() {
  return getToken() !== null
}
// 清除登录信息
export function removeToken() {
  return localStorage.removeItem('BM-App-Token')
}
// REVIEW 此处判断用户登录情况
export function checkToken() {
  // 如果是微信，并且没有本地Token，则直接拼接跳转获取token
  const osObj = getOs()
  if (osObj.isWx) {
    const propData = Base64.encode(String(location.hash).slice(1))
    // 截取#符号
    const redirect_uri =
      'https://api2.fengjishi.com.cn/auth/h5login?uri=' + propData
    // 跳转授权页
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
      encodeURIComponent(redirect_uri) +
      '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  } else if (osObj.isIphone || osObj.isAndroid) {
    // 如果是APP，获取APP放在cookie里的token
    const token = Cookies.get('token')
    if (token) {
      setToken(token)
      location.reload()
    } else {
      console.log('没得到token', Cookies.get())
    }
  } else {
    // 如果是网页端，没有token弹出手机号登录界面
    import('@/route/index').then(module => {
      module.default.push('/login')
    })
  }
}
