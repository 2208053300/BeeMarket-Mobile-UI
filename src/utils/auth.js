// 获取Token
export function getToken() {
  return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjAxNjgwNTUsImV4cCI6MTU2Mjc2MDA1NSwianRpIjoiNGMwODFjMmRiMTE5M2Q5OThkNGU0ODBmNDQ4ODZjMzQiLCJzZWMiOiIzMTY5YTA3YTcwYmJkZGNiY2M1YjMwYzM2MWJmNTZlOCIsInNpZyI6IjNiMjcwMjgzNDMzNjIxYjQ4NzY3NDlkNTc5N2NhOWI5YTAxMDk4ZDk5MTAyYWY5ZmQyM2UyN2ZjMDdiZTEyNTcifQ.bx1aNwide8BeI66htZMhL6fvJI9eHE-12wjlba_CWEI'
  // return localStorage.getItem('BM-App-Token')
}
// 设置Token
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
