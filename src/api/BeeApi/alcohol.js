// NOTE 贵宾陈酿
import request from '@/utils/request'

// NOTE 获取现金券列表
export function getTicketListData(data) {
  return request({
    url: '/user/coupon/list',
    method: 'post',
    data
  })
}
// NOTE 获取现金券列表
export function toBalance(data) {
  return request({
    url: '/user/coupon/PresentBalance',
    method: 'post',
    data
  })
}

export function maxNumber(data) {
  return request({
    url: '/user/liquor/number',
    method: 'post',
    data
  })
}
