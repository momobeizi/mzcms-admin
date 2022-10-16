import request from '@/utils/service'

// 获取文档类别
export function uploadFile (data) {
  return request({
    url: '/setting/uploadFile',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: 'post',
    data
  })
}


