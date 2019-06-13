// NOTE 蜂任务
import request from '@/utils/request'
// 成为达人-用户是否消费
export function isConsume() {
  return request({
    url: '/task/isConsume',
    method: 'post'
  })
}
