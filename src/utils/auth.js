import { getOs } from '@/utils'
// import { Base64 } from 'js-base64'
import Cookies from 'js-cookie'
import { auditWechat } from '@/api/BeeApi/auth'
import { GetRequest } from '@/utils/index'
// 获取Token
export function getToken() {
  const osObj = getOs()
  if (osObj.isWx) {
    const token = localStorage.getItem('BM-App-Token')
    const uriProp = GetRequest('code')
    if (token) {
      return token
    } else if (
      uriProp &&
      !token &&
      localStorage.getItem('BM-App-Token') !== 'waiting'
    ) {
      localStorage.setItem('BM-App-Token', 'waiting')
      // 微信授权登录
      wxLogin(uriProp)
    } else {
      console.log('微信CODE为空')
    }
    return localStorage.getItem('BM-App-Token')
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    return Cookies.get('token')
  } else {
    return localStorage.getItem('BM-App-Token')
  }
  // return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjEwMTIzMzksImV4cCI6MTU2MzYwNDMzOSwianRpIjoiMTU5ZTVlNDA2YTRhMzRiZjllN2ZhOGNjZGZjMjI3NzUiLCJzZWMiOiJkZmRhMWI5NTQ0YWZiNDc4NGRkODBjYjFmNTJjZGU5NCIsInNpZyI6IjNjZDAzMjQyMGM5OWVkMDk1MmUxMzYwZmIzZGJjMjI2MWM5N2RjMTdkYmNlYTUzOTRiZWNmYjEwMzAzYWVhMjYifQ.w8Tbczs73tb_IONDQbV4b90g5AFUE5-XUhXhH7TmatM'
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
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
      encodeURIComponent(window.location.href) +
      '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
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
async function wxLogin(code) {
  await auditWechat({ code: code })
  // // FIXME 如果CODE已经使用过，没有返回TOKEN，重定向到授权页
  if (
    localStorage.getItem('BM-App-Token') === 'waiting' ||
    !localStorage.getItem('BM-App-Token')
  ) {
    const uriProp = GetRequest('state')
    // 只带state后面的参数跳转
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
      encodeURIComponent(window.location.origin + window.location.pathname + uriProp.slice(5)) +
      '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
  }
}
