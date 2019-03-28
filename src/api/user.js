// NOTE 数据统计接口
import request from '@/utils/request'
// ANCHOR 商品
// NOTE 获取商品详情
export function test1(data) {
  return request({
    url: '/test1',
    method: 'get',
    params: data
  })
}
