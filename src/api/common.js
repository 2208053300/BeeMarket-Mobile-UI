// NOTE 公用
import request from '@/utils/request'

// NOTE 获取公益值详情
export function getBeeComVal(data) {
  return request({
    url: '/common/getBeeComVal',
    method: 'get',
    params: data
  })
}
