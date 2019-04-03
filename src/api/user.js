// NOTE 数据统计接口
import request from '@/utils/request'

// NOTE 获取用户收货地址
export function getAddressList(data) {
  return request({
    url: '/persion/getAddressList',
    method: 'get',
    params: data
  })
}
// NOTE 获取用户已收藏店铺
export function getStoreCollected(data) {
  return request({
    url: '/persion/getStoreCollected',
    method: 'get',
    params: data
  })
}
