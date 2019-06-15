// NOTE 店铺
import request from '@/utils/request'
// 店铺主页
export function getStoreDetail(data) {
  return request({
    url: '/store/main',
    method: 'post',
    data
  })
}

// 商家入驻
export function entering(data) {
  return request({
    url: '/store/merchant/entering',
    method: 'post',
    data
  })
}
