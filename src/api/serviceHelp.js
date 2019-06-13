// NOTE 客服帮助
import request from '@/utils/request'

// NOTE 获取帮助首页
export function getServiceIndex(data) {
  return request({
    url: '/ServiceHelp/getServiceIndex',
    method: 'get',
    params: data
  })
}
// NOTE 获取问题分类列表
export function getSortList(data) {
  return request({
    url: '/ServiceHelp/getSortList',
    method: 'get',
    params: data
  })
}
// NOTE 根据问题获取答案
export function getAnswer(data) {
  return request({
    url: '/ServiceHelp/getAnswer',
    method: 'get',
    params: data
  })
}
