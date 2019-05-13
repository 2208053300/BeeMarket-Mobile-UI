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
// NOTE 获取蜂集市活动
export function getBeeAction(data) {
  return request({
    url: '/home/getBeeAction',
    method: 'get',
    params: data
  })
}
// NOTE 获取蜂集市任务
export function getBeeTask(data) {
  return request({
    url: '/home/getBeeTask',
    method: 'get',
    params: data
  })
}
