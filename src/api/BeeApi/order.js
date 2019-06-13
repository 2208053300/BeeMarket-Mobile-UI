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
