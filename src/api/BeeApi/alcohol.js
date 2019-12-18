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
// NOTE 转为余额
export function toBalance(data) {
  return request({
    url: '/user/coupon/PresentBalance',
    method: 'post',
    data
  })
}
// NOTE 现金券提现
export function toCash(data) {
  return request({
    url: '/user/coupon/cashBalance',
    method: 'post',
    data
  })
}

// NOTE 改版后的红包补贴信息
export function getCashInfo(data) {
  return request({
    url: '/user/cash/info',
    method: 'post',
    data
  })
}
// NOTE 检查提现的是否超额
export function withdrawCheck(data) {
  return request({
    url: '/user/cash/withdraw',
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

export function cashShareQrcode(data) {
  return request({
    url: '/user/cash/share',
    method: 'post',
    data
  })
}
