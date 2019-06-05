// 获取Token
export function getToken() {
  return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTk3MTMwNzgsImV4cCI6MTU2MjMwNTA3OCwianRpIjoiZDJiNWUxNjZlMTQ1M2ZkZmE5MTgxYTI0OGViZmZlMWMiLCJzZWMiOiJlNWQ2YTFmZmU4ODE0NjYwYjI3ZGE2Mjk3OGUwMzk3MyIsInNpZyI6Ijg5NTE1ZWU4YTdjZjY0NjZmNTJhOGE2YTUwNDg4YjVkN2M2MDBmNDRjNjY3MTQzZDg1NGIxZmQ5MmE5ZWM4ODAifQ.Y0cX6EIpUWH6Ur8T_toHygbyOcJ7SQzYNZZ3PlmNO7I'
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
