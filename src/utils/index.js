// 判断是否JSON格式数据
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}
// 判断操作系统，方便连接跳转
export function getOs() {
  var UserAgent = navigator.userAgent.toLowerCase()
  return {
    isIphone: /iphone os/.test(UserAgent),
    isAndroid: /android/.test(UserAgent),
    isWx: /micromessenger/.test(UserAgent)
    // isIpad: /ipad/.test(UserAgent),
    // isWindowsMobile: /windows mobile/.test(UserAgent),
    // isWin2K: /windows nt 5.0/.test(UserAgent),
    // isXP: /windows nt 5.1/.test(UserAgent),
    // isVista: /windows nt 6.0/.test(UserAgent),
    // isWin7: /windows nt 6.1/.test(UserAgent),
    // isWin8: /windows nt 6.2/.test(UserAgent),
    // isWin81: /windows nt 6.3/.test(UserAgent),
    // isMac: /mac os/.test(UserAgent)
  }
}
export function goHome() {
  window.location.href = 'http://app.fengjishi.com.cn'
}
export function GetRequest() {
  const url = location.hash // 获取url中"?"符后的字串
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    const str = url.substr(url.indexOf('?') + 1)
    const strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
