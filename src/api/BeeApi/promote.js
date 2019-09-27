// NOTE 海报
import request from '@/utils/request'
// 用户二维码
export function getQrcode(data) {
  return request({
    url: '/promote/shareCode',
    method: 'post',
    data
  })
}
// 是否已生成图片
export function getIsset(data) {
  return request({
    url: '/promote/isset',
    method: 'get',
    params: data
  })
}
// 获取模板列表
export function getTemplates(data) {
  return request({
    url: '/promote/templates',
    method: 'get',
    params: data
  })
}
// 生成结果图片上传
export function postGenerated(data) {
  return request({
    url: '/promote/generated',
    method: 'post',
    data
  })
}
// 自定义图片上传
export function postCustom(data) {
  return request({
    url: '/promote/custom',
    method: 'post',
    data
  })
}
// 获取自上传原图
export function getOrigin(data) {
  return request({
    url: '/promote/origin',
    method: 'get',
    params: data
  })
}
