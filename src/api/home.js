// NOTE 首页接口
import request from '@/utils/request'

// NOTE 获取限量疯抢列表
export function getBeeLimitList(data) {
  return request({
    url: '/home/getBeeLimitList',
    method: 'get',
    params: data
  })
}
