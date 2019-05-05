// NOTE 发现接口
import request from '@/utils/request'
// NOTE 获取公益行动列表
export function getActionList(data) {
  return request({
    url: '/discover/getActionList',
    method: 'get',
    params: data
  })
}
// NOTE 获取集市动态
export function getArticleList(data) {
  return request({
    url: '/discover/getArticleList',
    method: 'get',
    params: data
  })
}
