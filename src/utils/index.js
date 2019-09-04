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
    isWx: /micromessenger/.test(UserAgent),
    isApp: /isapp/.test(UserAgent)
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
  window.location.href = 'https://app.fengjishi.com'
}
export function GetRequest(parameName) {
  // / 获取地址栏指定参数的值
  // / <param name="parameName">参数名</param>
  // 获取url中跟在问号后面的部分
  var parames = window.location.search
  // 检测参数是否存在
  if (parames.indexOf(parameName) > -1) {
    var parameValue = ''
    parameValue = parames.substring(parames.indexOf(parameName), parames.length)
    // 检测后面是否还有参数
    if (parameValue.indexOf('&') > -1) {
      // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
      parameValue = parameValue.substring(0, parameValue.indexOf('&'))
      // 去掉参数名, 得到最终纯值字符串
      parameValue = parameValue.replace(parameName + '=', '')
      return parameValue
    }
    return ''
  }
}
export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  if (window.location.hash.indexOf('?') < 0) {
    return null
  }
  const r = window.location.hash.split('?')[1].match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}
// 取时分秒
export function formatSeconds(value) {
  var theTime = parseInt(value) // 秒
  var theTime1 = 0 // 分
  var theTime2 = 0 // 小时
  // alert(theTime);
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    // alert(theTime1+"-"+theTime);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  var result = '' + parseInt(theTime) + '秒'
  if (theTime1 > 0) {
    result = '' + parseInt(theTime1) + '分' + result
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2) + '小时' + result
  }
  return result
}
