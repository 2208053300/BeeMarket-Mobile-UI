// NOTE 购物车接口
import request from '@/utils/request'
// NOTE 获取购物车列表
export function getCartList(data) {
  return request({
    url: '/cart/getCartList',
    method: 'get',
    params: data
  })
}
// NOTE 获取猜你喜欢
export function getGuess(data) {
  return request({
    url: '/cart/getGuess',
    method: 'get',
    params: data
  })
}
// NOTE 获取分享购物车列表
export function getShareCartList(data) {
  return request({
    url: '/cart/getShareCartList',
    method: 'get',
    params: data
  })
}
