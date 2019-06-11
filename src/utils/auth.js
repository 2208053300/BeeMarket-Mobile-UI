// 获取Token
export function getToken() {
  return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXBlIjoxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjAxNzExNzMsImV4cCI6MTU2Mjc2MzE3MywianRpIjoiMmY5OTM4YjVmODEzM2E3NTljNzA1NWM2NDI0NGY1MmUiLCJzZWMiOiIxNjg3ZWY4ZThkNjRlMzg5MDJlYWYyYWM4NzliNzNkOCIsInNpZyI6IjBjNThiZTI5NmVlODI3MjU4MDdmNzYyMjM0YTQ4NjJhOGIzNWYyZmNkMWI2M2Y2YzhiYzA2Y2NjYTg2ZmQ2Y2EifQ.1cbphlLoHKHwRjm6f5nmYidpNOuys50LhFO6ev4tUOU'
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
