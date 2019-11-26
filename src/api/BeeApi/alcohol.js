// NOTE 贵宾陈酿
import request from '@/utils/request'

// NOTE 获取现金券列表
export function getTicketListData(data) {
  return request({
    url: '/user/coupon/list',
    method: 'post',
    data
  })
}
