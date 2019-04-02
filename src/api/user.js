// NOTE 数据统计接口
import request from '@/utils/request'
// ANCHOR 商品
// NOTE 获取用户收货地址
export function getAddressList(data) {
  return request({
    url: '/persion/getAddressList',
    method: 'get',
    params: data
  })
}
