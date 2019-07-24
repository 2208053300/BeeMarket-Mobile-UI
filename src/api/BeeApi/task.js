// NOTE 蜂任务
import request from '@/utils/request'
// 成为达人-用户是否消费
export function isConsume() {
  return request({
    url: '/task/isConsume',
    method: 'post'
  })
}
// 蜂任务 - 任务列表
export function getTaskList(data) {
  return request({
    url: '/task/index',
    method: 'post',
    data
  })
}
// 蜂任务 - 领取奖励
export function getTaskAward(data) {
  return request({
    url: '/task/receive',
    method: 'post',
    data
  })
}
// 蜂任务 - 任务详情
export function getTaskDetail(data) {
  return request({
    url: '/task/details',
    method: 'post',
    data
  })
}
// 消费金额达标 - 提示记录
export function getTaskPrompt(data) {
  return request({
    url: '/task/prompt',
    method: 'post',
    data
  })
}
