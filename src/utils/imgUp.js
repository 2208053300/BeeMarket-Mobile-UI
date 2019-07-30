import { compress } from './compress'

/**
 * 压缩图片
 * @param file 图片文件
 */
export function zipImg(file) {
  return new Promise((resolve, reject) => {
    const isLt5M = file.size / 1024 / 1024 < 10
    const isImage = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
    if (!isLt5M) {
      reject('上传图片大小不能超过 10M!')
    } else if (!isImage) {
      reject('只能上传图片文件!')
    } else {
      compress(file, function(val) {
        resolve(val)
      })
    }
  })
}

/**
 * 压缩图片
 * @param file 图片文件流
 */
export function zipRawImg(file) {
  return new Promise((resolve, reject) => {
    const isLt5M = file.size / 1024 / 1024 < 5
    const isImage = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
    if (!isLt5M) {
      reject('上传图片大小不能超过 5M!')
    } else if (!isImage) {
      reject('只能上传图片文件!')
    } else {
      compress(file, function(val) {
        resolve(val)
      })
    }
  })
}

export function checkImg(file, fileSize = 2) {
  const isLt5M = file.size / 1024 / 1024 < fileSize
  const isImage = file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/bmp' || file.raw.type === 'image/gif' || file.raw.type === 'image/webp'
  if (!isLt5M) {
    return `上传图片大小不能超过 ${fileSize} M!`
  } else if (!isImage) {
    return '只能上传图片文件!'
  }
}

/**
 * 检查文件是否符合上传要求
 * @param fileRaw 源文件\文件流
 * @param fileSize 文件最大 n M
 * @returns {string} 错误消息
 */
export function checkRawImg(fileRaw, fileSize = 2) {
  const isLt5M = fileRaw.size / 1024 / 1024 < fileSize
  const isImage = fileRaw.type === 'image/png' || fileRaw.type === 'image/jpg' || fileRaw.type === 'image/jpeg' || fileRaw.type === 'image/bmp' || fileRaw.type === 'image/gif' || fileRaw.type === 'image/webp'
  if (!isLt5M) {
    return `上传图片大小不能超过 ${fileSize} M!`
  } else if (!isImage) {
    return '只能上传图片文件!'
  }
}

/**
 * 将 form 对象 转换为 FormData 对象
 * @param form 键值对 对象
 * @returns {{data: FormData, hasImg: number}}
 */
export function formToForamData(form) {
  const formData = new FormData()
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      formData.append(key, form[key])
    }
  }
  return {
    data: formData,
    hasImg: 1
  }
}
