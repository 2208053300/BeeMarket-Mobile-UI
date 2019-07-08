// NOTE 免费送礼
import request from '@/utils/request'

// NOTE 活动首页数据
export function getIndexData(data) {
  return request({
    url: '/package/list',
    method: 'post',
    data
  })
}
