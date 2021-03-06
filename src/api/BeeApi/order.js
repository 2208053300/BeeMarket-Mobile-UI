// NOTE 订单
import request from '@/utils/request'
// 订单确认
export function confirmOrder(data) {
  return request({
    url: '/order/confirm',
    method: 'post',
    data
  })
}
// 提交订单
export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data
  })
}
// 订单取消
export function closeOrder(data) {
  return request({
    url: '/order/close',
    method: 'post',
    data
  })
}
// 删除订单
export function deleteOrder(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data
  })
}
// 确认收货（订单完成）
export function completeOrder(data) {
  return request({
    url: '/order/complete',
    method: 'post',
    data
  })
}
// 订单 订单支付
export function orderPay(data) {
  return request({
    url: '/order/pay',
    method: 'post',
    data
  })
}
// 再次购买（订单）
export function reBuy(data) {
  return request({
    url: '/user/order/repurchase',
    method: 'post',
    data
  })
}
// 订单 订单支付结果
export function payResult(data) {
  return request({
    url: '/order/result',
    method: 'post',
    data
  })
}
// 订单 支付验证接口，不用等响应
export function orderVerify(data) {
  return request({
    url: '/order/verify',
    method: 'post',
    data
  })
}
// 确认领酒
export function sendOrder(data) {
  return request({
    url: '/user/liquor/sendOrder',
    method: 'post',
    data
  })
}
