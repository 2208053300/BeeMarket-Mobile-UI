// 获取Token
export function getToken() {
  return localStorage.getItem('BM-App-Token')
}
// 设置Token
export function setToken(Token) {
  return localStorage.setItem('BM-App-Token', Token)
}
