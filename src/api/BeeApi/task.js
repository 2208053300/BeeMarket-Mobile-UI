// NOTE 蜂任务
import request from '@/utils/request'
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
