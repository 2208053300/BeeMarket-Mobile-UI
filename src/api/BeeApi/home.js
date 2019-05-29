// NOTE 首页
import request from '@/utils/request'
// 用户基本信息获取
export function getBeeLimitList(data) {
  return request({
    url: '/home/limited',
    method: 'post',
    data
  })
}
