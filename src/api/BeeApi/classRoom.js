import request from '@/utils/request'

// NOTE 课堂列表
export function classRoomList(data) {
  return request({
    url: '/fair_class/list',
    method: 'post',
    data
  })
}
