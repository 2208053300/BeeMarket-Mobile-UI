import { getOs } from '@/utils'
import Cookies from 'js-cookie'

// 获取Token
export function getToken() {
  // const osObj = getOs()
  // if (osObj.isIphone || osObj.isAndroid) {
  //   return Cookies.get('token')
  // }
  return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjAxNjgwNTUsImV4cCI6MTU2Mjc2MDA1NSwianRpIjoiNGMwODFjMmRiMTE5M2Q5OThkNGU0ODBmNDQ4ODZjMzQiLCJzZWMiOiIzMTY5YTA3YTcwYmJkZGNiY2M1YjMwYzM2MWJmNTZlOCIsInNpZyI6IjNiMjcwMjgzNDMzNjIxYjQ4NzY3NDlkNTc5N2NhOWI5YTAxMDk4ZDk5MTAyYWY5ZmQyM2UyN2ZjMDdiZTEyNTcifQ.bx1aNwide8BeI66htZMhL6fvJI9eHE-12wjlba_CWEI'
  // return localStorage.getItem('BM-App-Token')
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
    // 截取#符号
    const redirect_uri =
      'https://api2.fengjishi.com.cn/auth/h5login?uri=' +
      String(location.hash).slice(1)
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
