// NOTE 免费送礼
import request from '@/utils/request'
const baseUrl = 'http://localhost:7310/mock/5d24313e04717440c4e50ad9'
// NOTE 免费送礼首页数据
// export function getIndexData(data) {
//   return request({
//     url: 'http://192.168.0.241:1314/freeGift/index',
//     method: 'post',
//     data
//   })
// }

// NOTE 获取免费送礼首页数据
export function getIndexData(data) {
  return request({
    url: baseUrl + '/home',
    method: 'post',
    data
  })
}
// NOTE 获取免费送礼 送礼历史列表数据
export function getHistoryData(data) {
  return request({
    url: baseUrl + '/historyData',
    method: 'post',
    data
  })
}
